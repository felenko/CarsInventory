using System.IO;
using System.Runtime.CompilerServices;
using CarsRepository;
using CarsRepository.Controllers;
using Microsoft.ApplicationInsights.Extensibility.Implementation;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace WebApplication1
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
            var filePath = _config["Repository:FilePath"];
            var cars = JsonConvert.DeserializeObject<Car[]>(File.ReadAllText(filePath));
            return cars;
        }

        public void Save(Car[] cars)
        {
            var filePath = _config["Repository:FilePath"];
            var serialized = JsonConvert.SerializeObject(cars);
            File.WriteAllText(filePath, serialized);
        }
    }
}