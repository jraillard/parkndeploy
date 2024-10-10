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
                .GetFromJsonAsync<ParkingAngersOpenDataApiResult?>("/api/explore/v2.1/catalog/datasets/parking-angers/records?limit=20");

            if (response is null)
                return [];

            return [
                .. response.Parkings
                .OrderByDescending(x => x.AvailablePlaces)
                .Select(x => new Parking(
                    x.Name,
                    x.AvailablePlaces,
                    x.AvailablePlaces switch
                    {
                        // Basic color coding for parking status
                        // Better way would be to combine with another datasets to get the parking capacity
                        < 5 => ParkingStatus.Red,
                        < 20 => ParkingStatus.Orange,
                        _ => ParkingStatus.Green
                    }
                ))];
        }
    }

    public record ParkingAngersOpenDataApiResult(
        [property: JsonPropertyName("total_count")] int TotalCount,
        [property: JsonPropertyName("results")] ParkingOpenDataApiResult[] Parkings);

    public record ParkingOpenDataApiResult(
        [property: JsonPropertyName("nom")] string Name,
        [property: JsonPropertyName("disponible")] int AvailablePlaces);

    public record Parking(
        string Name,
        int AvailablePlaces,
        ParkingStatus status);

    public enum ParkingStatus
    {
        Green = 0,
        Orange = 1,
        Red = 2,
    }
}
