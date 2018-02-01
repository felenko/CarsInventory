using System;
using CarsRepository.Controllers;
using Moq;
using NUnit.Framework.Internal;
using WebApplication1;
using Xunit;


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

        
        public  CarRepositoryControllerTests()
        {
            providerMock = new Mock<IPersistenceProvider>();
            carsRepositoryController = new CarRepositoryController(providerMock.Object);
        }

        [Fact]
        public void GetEntry_ByIndex_EntryReterned()
        {
            var fakeIndex = 1;
            providerMock.Setup(c => c.Load()).Returns(_fakeCarslist);
            var car = carsRepositoryController.GetCar(fakeIndex);

            Assert.Equal(_fakeCarslist[0], car);
        }

        [Fact]
        public void GetEntry_EntryIsAbsent_Exception()
        {
            var fakeIndex = 4;
            providerMock.Setup(c => c.Load()).Returns(_fakeCarslist);
            Assert.Throws<Exception>(() => carsRepositoryController.GetCar(fakeIndex));
        }

    }
}
