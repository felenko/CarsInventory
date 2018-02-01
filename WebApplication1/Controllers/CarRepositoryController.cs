using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using WebApplication1;

namespace CarsRepository.Controllers
{
    [Route("api/[controller]/[action]")]
    public class CarRepositoryController : Controller
    {
        private IPersistenceProvider _provider;
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(typeof(CarRepositoryController));
        private static readonly object _lockObject = new object();
        public CarRepositoryController(IPersistenceProvider provider)
        {
            _provider = provider;
        }

        [HttpGet]
        public IEnumerable<Car> GetAllCars()
        {
            return new[]
            {
                new Car() {Id=1, Manufacturer = "Ford", Make = "Mustang", Model="GT", Year=2015},
                new Car() {Id=2, Manufacturer = "Ford", Make = "Mustang", Model="GT", Year=2016},
                new Car() {Id=3, Manufacturer = "Ford", Make = "Mustang", Model="GT", Year=2017},
            };
        }
        
        [HttpPost]
        public void UpdateAllCars([FromBody]Car[] newCars)
        {
            try
            {
                _log.Info("Update cars repository request reseived");
                if (newCars == null) throw new ArgumentException("newCars can't be null");
                lock (_lockObject)
                {
                    var cars = _provider.Load().ToList();
                    var removedCarsWithIndexes = cars.Select((car, index) => new { car, index }).Where(c => !CarInList(newCars, c.car)).ToArray();
                    for (int i = removedCarsWithIndexes.Length - 1; i >= 0; i--)
                    {
                        cars.RemoveAt(removedCarsWithIndexes[i].index);
                    }

                    var changedCarsWithIndexes = newCars.Select((car, index) => new { car, index }).Where(c => CarInList(cars, c.car));
                    foreach (var changedCarsWithIndex in changedCarsWithIndexes)
                    {
                        cars[changedCarsWithIndex.index] = changedCarsWithIndex.car;
                    }

                    var addedCars = newCars.Select((car, index) => new { car, index }).Where(c => !CarInList(cars, c.car));
                    foreach (var addedCarIndex in addedCars)
                    {
                        cars.Add(addedCarIndex.car);
                    }

                    _provider.Save(cars.ToArray());
                }
            }
            catch (Exception ex)
            {
                _log.Error("Error:", ex);
                throw new Exception("Error", ex);
            }
        }

        [HttpPost]
        public void UpSertCar([FromBody] Car newCar)
        {
            try
            {
                _log.Info("Insert car request reseived");
                if (newCar == null) throw new ArgumentException("car can't be null");
                lock (_lockObject)
                {
                    var cars = _provider.Load().ToList();
                    var result = cars.Select((car, index) => new {car, index}).FirstOrDefault(c => c.car.Id == newCar.Id);
                    if (result == null)
                    {
                        cars.Add(newCar);
                        _log.Info("The was no such entry in repository. New car added.");
                    }
                    else
                    {
                        cars[result.index] = newCar;
                        _log.Info("Car entry updated.");
                    }

                    _provider.Save(cars.ToArray());
                }
            }
            catch (Exception ex)
            {
                _log.Error("Error:", ex);
                throw new Exception("Error", ex);
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void DeleteCar(int id)
        {
            _log.Info("id car request reseived");

            lock (_lockObject)
            {
                var cars = _provider.Load().ToList();
                var result = cars.Select((car, index) => new {car, index}).FirstOrDefault(c => c.car.Id == id);
                if (result == null)
                {
                    throw new Exception("Entry with index does not exist in repository");
                }

                cars.RemoveAt(id);
                _log.Info("Car entry updated.");
                _provider.Save(cars.ToArray());
            }
        }

        [HttpGet("{id}")]
        public Car GetCar(int index)
        {
            try
            {
                _log.Info($"Get car request reseived with index:{index}");
                Car[] cars = _provider.Load();
                var car = cars.FirstOrDefault(c => c.Id == index);
                if (car == null) throw new Exception($"Entry with index:{index} does not exist in repository");
                return car;
            }
            catch (Exception ex)
            {
                _log.Error("Error:", ex);
                throw new Exception("Error", ex);
            }
        }

        public bool CarInList(IEnumerable<Car> cars, Car car)
        {
            return cars.Any(c => c.Id == car.Id);
        }
    }
}

