import request from "../../axiosClient";
import { Parking } from "./contracts";
import { ParkingsAngersEndpoints } from "./enpoints";


export default class ParkingsAngersService {
    public static readonly getParkings = async (parkingName: string): Promise<Parking[]> => {
      const response = await request({
            url: ParkingsAngersEndpoints.getParkings(parkingName),
            method: 'GET',
        });
        return response as Parking[];
    };
};