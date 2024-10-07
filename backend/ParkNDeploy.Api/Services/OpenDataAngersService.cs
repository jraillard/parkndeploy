using System.Text.Json.Serialization;

namespace ParkNDeploy.Api.Services
{
    /// <summary>
    /// Service allowing to call OpenDataAngers API
    /// </summary>
    public class OpenDataAngersService
    {
        private readonly HttpClient _client;

        public OpenDataAngersService(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Get Angers parkings
        /// </summary>
        /// <returns>List of parkings</returns>
        public async Task<Parking[]> GetParkingsAsync()
        {
            var response = await _client
                .GetFromJsonAsync<ParkingAngersResult?>("/api/explore/v2.1/catalog/datasets/parking-angers/records?limit=20");

            if (response is null)
                return [];

            return response.Parkings;
        }
    }

    public record ParkingAngersResult(
        [property: JsonPropertyName("total_count")] int TotalCount,
        [property: JsonPropertyName("results")] Parking[] Parkings);

    public record Parking(
        [property: JsonPropertyName("nom")] string Name,
        [property: JsonPropertyName("disponible")] int AvailablePlaces);
}
