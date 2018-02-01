using CarsRepository.Controllers;

namespace CarsRepository
{
    public interface IPersistenceProvider
    {
        Car[] Load();
        void Save(Car[] cars);
    }
}