using CarsRepository.Controllers;

namespace CarsRepository.Tests
{
    static class CarUtils
    {
        public static bool EqualToCar(this Car car1, Car car2)
        {
            return car1.Id == car2.Id
                   && car1.Manufacturer == car2.Manufacturer
                   && car1.Make == car2.Make
                   && car1.Model == car2.Model
                   && car1.Year == car2.Year;
        }
    }
}