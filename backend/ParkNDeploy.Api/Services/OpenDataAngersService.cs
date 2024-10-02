using System.Linq;
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
        public async Task<Parking[]> GetParkingsAsync(string? parkingName)
        {
            // Compute URL to call depending on filters
            var parkingAngersDataSetUrl = "/api/explore/v2.1/catalog/datasets/parking-angers/records?order_by=nom&limit=100";
            var angersStationnementDataSetUrl = "/api/explore/v2.1/catalog/datasets/angers_stationnement/records?order_by=id_parking&limit=100";
            if (!string.IsNullOrEmpty(parkingName))
            {
                parkingAngersDataSetUrl += $"&where=search(nom%2C%20%22{parkingName}%22)";
                angersStationnementDataSetUrl += $"&where=search(id_parking%2C%20%22{parkingName}%22)";
            }

            // Retrieve real-time parking data from parking-angers dataset
            var parkingAngersDataSetResponse = await _client
                .GetFromJsonAsync<ParkingAngersDataSetResponse?>(parkingAngersDataSetUrl);

            if (parkingAngersDataSetResponse is null)
                return [];

            // Retrive the parking details through angers-stationnement dataset
            var angersStationnementDataSetResponse = await _client
                .GetFromJsonAsync<AngersStationnementDataSetResponse?>(angersStationnementDataSetUrl);

            IEnumerable<Parking> parkingData;

            if (angersStationnementDataSetResponse is null)
            {
                // Use the basic data from parking-angers dataset
                parkingData = parkingAngersDataSetResponse.Parkings
                    .Select(x => new Parking(
                        x.Name,
                        x.AvailablePlaces,
                        string.Empty,
                        ParkingStatus.Undefined // Parking status cannot be determined
                    ))
                    .OrderByDescending(x => x.AvailablePlaces); // Order by available places cause status isnt defined
            }
            else
            {
                // Merge the data from both datasets
                parkingData = Enumerable.Zip(
                        parkingAngersDataSetResponse.Parkings,
                        angersStationnementDataSetResponse.Parkings,
                        (parkingAngers, angersStationnement) =>
                        {
                            return new Parking(
                                parkingAngers.Name,
                                parkingAngers.AvailablePlaces,
                                angersStationnement.Address,
                                ((double)parkingAngers.AvailablePlaces / angersStationnement.MaxPlaces) switch
                                {
                                    // sub 10% = Red, sub 50% = Orange, 50%+ = Green, undefined otherwise
                                    <= 0.10f => ParkingStatus.Red,
                                    <= 0.50f => ParkingStatus.Orange,
                                    > 0.50f => ParkingStatus.Green,
                                    _ => ParkingStatus.Undefined
                                }
                            );
                        })
                    .OrderByDescending(x => x.AvailablePlaces);
            }

            return parkingData.ToArray();
        }
    }

    public record ParkingAngersDataSetResponse(
        [property: JsonPropertyName("total_count")] int TotalCount,
        [property: JsonPropertyName("results")] ParkingAngersDataSetResponseItem[] Parkings);

    public record ParkingAngersDataSetResponseItem(
        [property: JsonPropertyName("nom")] string Name,
        [property: JsonPropertyName("disponible")] int AvailablePlaces);

    public record AngersStationnementDataSetResponse(
        [property: JsonPropertyName("total_count")] int TotalCount,
        [property: JsonPropertyName("results")] AngersStationnementDataSetResponseItem[] Parkings);

    public record AngersStationnementDataSetResponseItem(
        [property: JsonPropertyName("id_parking")] string Name,
        [property: JsonPropertyName("adresse")] string Address,
        [property: JsonPropertyName("nb_places")] int MaxPlaces);

    public record Parking(
        string Name,
        int AvailablePlaces,
        string Address,
        ParkingStatus Status);

    public enum ParkingStatus
    {
        Undefined = 0,
        Green = 1,
        Orange = 2,
        Red = 3,
    }
}
