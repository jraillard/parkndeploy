import { useDebounce } from "@/hooks/useDebounce";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useParkingSearchStore } from "@/stores/parkingSearchStore";

type ParkingListFiltersProps = {
  onChange: (parkingName: string) => void;
};

export default function ParkingListFilters({
  onChange,
}: Readonly<ParkingListFiltersProps>) {
  const { parkingName, setParkingName } = useParkingSearchStore();

  const debouncedParkingSearched = useDebounce(parkingName);

  useEffect(() => {
    onChange(debouncedParkingSearched);
  // disable next line because of debounced feature
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParkingSearched]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Type a parking name"
        value={parkingName}
        onChange={(e) => setParkingName(e.target.value)}
      />
    </div>
  );
}
