export type Parking = {
    name: string;
    availablePlaces: number;
    address: string;
    status: ParkingStatus;
}

export enum ParkingStatus {
    UNKNOWN = 0,
    GREEN = 1,
    ORANGE = 2,
    RED = 3
}