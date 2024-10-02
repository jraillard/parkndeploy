import {
  Parking,
  ParkingStatus,
} from "@/api/services/ParkingsAngersService/contracts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaSquareParking } from "react-icons/fa6";

type ParkingListProps = {
  parkings: Parking[];
};

export default function ParkingList({ parkings }: Readonly<ParkingListProps>) {
  function computeCardBgColor(parkingStatus: ParkingStatus): string {
    switch (parkingStatus) {
      case ParkingStatus.GREEN:
        return "bg-green-600";
      case ParkingStatus.RED:
        return "bg-red-600";
      case ParkingStatus.ORANGE:
        return "bg-orange-600";
      case ParkingStatus.UNKNOWN:
      default:
        return "";
    }
  }

  const content =
    parkings.length == 0 ? (
      <span>No parkings found</span>
    ) : (
      <div
        className={`grid gap-4 justify-center ${
          parkings.length < 3 ? "grid-cols-1" : "grid-cols-3"
        }`}
      >
        {parkings.map((parking: Parking) => (
          <Card
            key={parking.name}
            className={computeCardBgColor(parking.status)}
          >
            <CardHeader>
              <CardTitle>{parking.name}</CardTitle>
              <CardDescription>{parking.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-center items-center gap-2">
                <FaSquareParking />
                <span>{parking.availablePlaces}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );

  return content;
}
