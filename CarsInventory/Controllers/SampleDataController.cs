using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CarsInventory.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                dateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                temperatureC = rng.Next(-20, 55),
                summary = Summaries[rng.Next(Summaries.Length)]
            });
        }
        [HttpPost("[action]")]
        public void SaveWeatherForecasts([FromBody]WeatherForecast[] forecast)
        {
            Console.WriteLine(forecast);
        }

        public class WeatherForecast
        {
            public string dateFormatted { get; set; }
            public int temperatureC { get; set; }
            public string summary { get; set; }

            public int temperatureF
            {
                get
                {
                    return 32 + (int)(temperatureC / 0.5556);
                }
                          }
        }
    }

    public class MyType
    {
        public string A { get; set; }
    }
}
