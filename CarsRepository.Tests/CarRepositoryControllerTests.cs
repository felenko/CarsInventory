using System;
using CarsRepository.Controllers;
using Moq;
using NUnit.Framework;
using Xunit;
using Assert = Xunit.Assert;


namespace CarsRepository.Tests
{


    public class CarRepositoryControllerTests
    {
        private Mock<IPersistenceProvider> providerMock;
        private CarRepositoryController carsRepositoryController;

        private Car[] _fakeCarslist =
        {
            new Car() {Manufacturer = "Ford", Make = "Escape", Model = "Titanium", Year = 2016, Id = 1},
            new Car() {Manufacturer = "Dodge", Make = "Durango", Model = "SRT", Year = 2017, Id = 2},
            new Car() {Manufacturer = "Acura", Make = "Mdx", Model = "Comfort", Year = 2017, Id = 3},
        };

        public CarRepositoryControllerTests()
        {
            providerMock = new Mock<IPersistenceProvider>();
            carsRepositoryController = new CarRepositoryController(providerMock.Object);
        }

        [Fact]
        public void GetCar_ByIndex_EntryReterned()
        {
            var fakeIndex = 1;
            providerMock.Setup(c => c.Load()).Returns(_fakeCarslist);
            var car = carsRepositoryController.GetCar(fakeIndex);

            Assert.Equal(_fakeCarslist[0], car);
        }

        [Fact]
        public void GetCar_EntryIsAbsent_Exception()
        {
            var fakeIndex = 4;
            providerMock.Setup(c => c.Load()).Returns(_fakeCarslist);
            Assert.Throws<Exception>(() => carsRepositoryController.GetCar(fakeIndex));
        }
        
        [Fact]
        public void UpdateAllCars_1NotChanged_1Deleted1_Updated_1Added_CarsUpdated()
        {
            Car[] actual = null;
            Car[] updatedCars =
            {
                new Car() {Manufacturer = "Ford", Make = "Escape", Model = "Titanium", Year = 2016, Id = 1},
                new Car() {Manufacturer = "Laborgini", Make = "Diblo", Model = "GT", Year = 2017, Id = 2},
                new Car() {Manufacturer = "VW", Make = "Golf", Model = "R", Year = 2015, Id = 4},
            };
            providerMock.Setup(p => p.Load()).Returns(_fakeCarslist);
            providerMock.Setup(p => p.Save(It.IsAny<Car[]>())).Callback<Car[]>(c => actual = c);
            carsRepositoryController.UpdateAllCars(updatedCars);

            Assert.Equal(3, actual.Length);
            Assert.True(actual[0].EqualToCar(_fakeCarslist[0]));
            Assert.True(actual[1].EqualToCar(updatedCars[1]));
            Assert.True(actual[2].EqualToCar(updatedCars[2]));
        }

        [Fact]
        public void UpsertAllCars_Existing_CarUpdated()
        {
            var newCar = new Car() {Manufacturer = "Laborgini", Make = "Diblo", Model = "GT", Year = 2017, Id = 2};
            Car[] actual = null;
            providerMock.Setup(p => p.Load()).Returns(_fakeCarslist);
            providerMock.Setup(p => p.Save(It.IsAny<Car[]>())).Callback<Car[]>(c => actual = c);

            carsRepositoryController.UpSertCar(newCar);
            Assert.Equal(3, actual.Length);
            Assert.True(actual[0].EqualToCar(_fakeCarslist[0]));
            Assert.True(actual[1].EqualToCar(newCar));
            Assert.True(actual[2].EqualToCar(_fakeCarslist[2]));
        }

        [Fact]
        public void UpsertAllCars_NewAdded_CarAdded()
        {
            var newCar = new Car() { Manufacturer = "Laborgini", Make = "Diblo", Model = "GT", Year = 2017, Id = 4 };
            Car[] actual = null;
            providerMock.Setup(p => p.Load()).Returns(_fakeCarslist);
            providerMock.Setup(p => p.Save(It.IsAny<Car[]>())).Callback<Car[]>(c => actual = c);

            carsRepositoryController.UpSertCar(newCar);
            Assert.Equal(4, actual.Length);
            Assert.True(actual[0].EqualToCar(_fakeCarslist[0]));
            Assert.True(actual[1].EqualToCar(_fakeCarslist[1]));
            Assert.True(actual[2].EqualToCar(_fakeCarslist[2]));
            Assert.True(actual[3].EqualToCar(newCar));
        }
        public void GetAllCars_CarsReturned()
        {
            providerMock.Setup(c => c.Load()).Returns(_fakeCarslist);
            var cars = carsRepositoryController.GetAllCars();

            CollectionAssert.Equals(_fakeCarslist, cars);
        }
    }
}
