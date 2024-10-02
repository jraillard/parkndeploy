using ParkNDeploy.Api.Services;

namespace ParkNDeploy.Api.Endpoints
{
    public static class ParkingAngersEndpoints
    {
        public static void MapParkingsAngersEndpoints(this WebApplication app)
        {
            app.MapGet("/parkings-angers", async (OpenDataAngersService openDataAngersService, string? parkingName) =>
            {
                var parkings = await openDataAngersService.GetParkingsAsync(parkingName);

                return parkings;
            })
            .WithName("GetAngersParkings")
            .WithOpenApi();
        }
    }
}
