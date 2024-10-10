export type Parking = {
    name: string;
    availablePlaces: number;
    status: ParkingStatus;
}

export enum ParkingStatus {
    GREEN = 0,
    ORANGE = 1,
    RED = 2
}