import { create } from "zustand";

type ParkingSearchStore = {
    parkingName: string;
    setParkingName: (parkingName: string) => void;
}

export const useParkingSearchStore = create<ParkingSearchStore>((set) => ({
    parkingName: "",
    setParkingName: (parkingName: string) => set({ parkingName }),
}));