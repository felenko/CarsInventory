using System.IO;
using CarsRepository.Controllers;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace CarsRepository
{
    public class FileSystemPersistenceProvider:IPersistenceProvider
    {
        private readonly IConfiguration _config;

        public FileSystemPersistenceProvider(IConfiguration config)
        {
            _config = config;
        }

        public Car[] Load()
        {
            var filePath = _config.GetValue<string>("Repository:FilePath");
            string content = File.ReadAllText(filePath);
            var cars = JsonConvert.DeserializeObject<Car[]>(content);
            return (cars==null)? new Car[0] : cars;
        }

        public void Save(Car[] cars)
        {
            var filePath = _config.GetValue<string>("Repository:FilePath");
            var serialized = JsonConvert.SerializeObject(cars);
            File.WriteAllText(filePath, serialized);
        }
    }
}