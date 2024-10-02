import { Parking } from "./contracts";
import ParkingsAngersService from "./service";

export type ParkingQueryResponse = {
    parkings: Parking[];
}

export const PARKINGS_QUERY_KEY = "parkings";

export default class ParkingsAngersEndpointsQueryMethods {
    public static readonly getAllParkings = async (parkingName: string): Promise<ParkingQueryResponse> => {
      const data = await ParkingsAngersService.getParkings(parkingName);
      return { parkings: data };
    };
}