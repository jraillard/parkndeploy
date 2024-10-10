import "./App.css";
import { Parking } from "./api/services/ParkingsAngersService/contracts";
import { useQuery } from "@tanstack/react-query";
import ParkingsAngersEndpointsQueryMethods, {
  PARKINGS_QUERY_KEY,
} from "./api/services/ParkingsAngersService/queries";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { LoadingSpinner } from "./components/ui/loadingspinner";

function App() {
  const { data, isPending } = useQuery({
    queryKey: [PARKINGS_QUERY_KEY],
    queryFn: ParkingsAngersEndpointsQueryMethods.getAllPArkings,
  });

  const content = isPending ? (
    <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />
  ) : (
    data &&
    data.parkings.map((parking: Parking, idx: number) => (
      <Card key={idx}>
        <CardHeader>
          <CardTitle>{parking.nom}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Nombre de places disponibles : {parking.disponible}</p>
        </CardContent>
      </Card>
    ))
  );

  return <div className="grid grid-cols-3 gap-4">{content}</div>;
}

export default App;
