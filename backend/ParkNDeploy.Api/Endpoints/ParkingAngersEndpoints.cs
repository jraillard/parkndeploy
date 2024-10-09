using ParkNDeploy.Api.Services;

namespace ParkNDeploy.Api.Endpoints
{
    public static class ParkingAngersEndpoints
    {
        public static void MapParkingsAngersEndpoints(this WebApplication app)
        {
            app.MapGet("/parkings-angers", async (OpenDataAngersService openDataAngersService) =>
            {
                var parkings = await openDataAngersService.GetParkingsAsync();

                return parkings;
            })
            .WithName("GetAngersParkings")
            .WithOpenApi();
        }
    }
}
