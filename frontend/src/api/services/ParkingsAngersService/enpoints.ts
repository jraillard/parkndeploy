export const ParkingsAngersEndpoints = {
    getParkings: (parkingName: string) => parkingName.length > 0 ? `parkings-angers?parkingName=${parkingName}` : "parkings-angers",
};