using Newtonsoft.Json;

namespace CarsRepository.Controllers
{
    public class Car
    {
        [JsonProperty("Id")]
        public int Id { get; set; }
        [JsonProperty("Manufacturer")]
        public string Manufacturer { get; set; }
        [JsonProperty("Make")]
        public string Make { get; set; }

        [JsonProperty("Model")]
        public string Model { get; set; }

        [JsonProperty("Year")]
        public int Year { get; set; }


    }
}