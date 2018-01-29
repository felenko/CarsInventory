using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace CarsRepository.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        public IEnumerable<Car> GetCars()
        {
            return new[]
            {
                new Car() {Id="1", Manufacturer = "Ford", Make = "Mustang", Model="GT", Year="2015"},
                new Car() {Id="1", Manufacturer = "Ford", Make = "Mustang", Model="GT", Year="2016"},
                new Car() {Id="1", Manufacturer = "Ford", Make = "Mustang", Model="GT", Year="2017"},
            };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class Car
    {
        public string Year { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Make { get; set; }
        public string Id { get; set; }
    }
}
