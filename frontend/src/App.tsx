import "./App.css";
import { Parking } from "./api/services/ParkingsAngersService/contracts";
import { useQuery } from "@tanstack/react-query";
import ParkingsAngersEndpointsQueryMethods, {
  PARKINGS_QUERY_KEY,
} from "./api/services/ParkingsAngersService/queries";

function App() {

  const { data, isPending } = useQuery({
    queryKey: [PARKINGS_QUERY_KEY],
    queryFn: ParkingsAngersEndpointsQueryMethods.getAllPArkings,
  });

  const content = isPending ? (
    <p>
      <em>Looking for parkings</em>
    </p>
  ) : (
    data &&
    data.parkings.map((parking: Parking, idx: number) => (
      <div key={idx}>
        <p>{parking.nom}</p>
        <p>{parking.disponible}</p>
      </div>
    ))
  );

  return (
    <div>
      <h1 id="tableLabel">ParkNDeploy</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {content}
    </div>
  );
}

export default App;
