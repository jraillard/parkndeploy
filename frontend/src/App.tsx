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
    queryFn: () =>
      ParkingsAngersEndpointsQueryMethods.getAllParkings(parkingName),
  });

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">
          Where can I Park in Angers ? 👀
        </h1>

        <ParkingListFilters
          onChange={(parkingName: string) => {
            console.log(parkingName);
          }}
        />
      </div>
      <div className="h-screen">
        {isPending && <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />}
        {isError && <span>Something went wrong with the backend ...</span>}
        {data && <ParkingList parkings={data.parkings} />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 text-center text-white bg-gray-800">
        ParkNDeploy {APP_VERSION}
      </div>
    </div>
  );
}

export default App;
