import "./App.css";
import { useQuery } from "@tanstack/react-query";
import ParkingsAngersEndpointsQueryMethods, {
  PARKINGS_QUERY_KEY,
} from "@/api/services/ParkingsAngersService/queries";
import ParkingList from "@/components/ParkingList/ParkingList";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import ParkingListFilters from "@/components/ParkingList/ParkingListFilters";
import { useParkingSearchStore } from "@/stores/parkingSearchStore";

function App() {
  const { parkingName } = useParkingSearchStore();

  const { data, isPending, isError } = useQuery({
    queryKey: [PARKINGS_QUERY_KEY, { parkingName }],
    queryFn: () => ParkingsAngersEndpointsQueryMethods.getAllParkings(parkingName),
  });

  console.log(parkingName)

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-2xl font-bold text-center">
        Where can I Park in Angers ? 👀 {APP_VERSION}
      </h1>
      <ParkingListFilters
        onChange={(parkingName: string) => {
          console.log(parkingName);
        }}
      />
      {isPending && <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />}
      {isError && <span>Something went wrong with the backend ...</span>}
      {data && <ParkingList parkings={data.parkings} />}
    </div>
  );
}

export default App;
