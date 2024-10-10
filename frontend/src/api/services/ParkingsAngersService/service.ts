import request from "../../axiosClient";
import { Parking } from "./contracts";
import { ParkingsAngersEndpoints } from "./enpoints";


export default class ParkingsAngersService {
    public static readonly getParkings = async (): Promise<Parking[]> => {
      const response = await request({
            url: ParkingsAngersEndpoints.getParkings(),
            method: 'GET',
        });
        return response as Parking[];
    };
};