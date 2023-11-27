import { SafeReservation } from "@/app/types";
import { format } from "date-fns";
import Button from "../Button";

interface ReservationTableProps {
  reservations: SafeReservation[];
  onCancel: (id: string) => void;
}

const ReservationTable = ({
  reservations,
  onCancel,
}: ReservationTableProps) => {
  return (
    <div className="w-full h-full py-3">
      <table className="w-full min-w-max table-auto text-center rounded-md overflow-hidden border border-black">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              No.
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Custommer
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Price
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Place
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Booking time
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Status
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Date
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td className="p-4 border-b border-blue-gray-50">{index + 1}</td>
              <td className="p-4 border-b border-blue-gray-50">
                {reservation.user.name}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {reservation.totalPrice}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {reservation.listing.title}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                From {format(new Date(reservation.startDate), "PP")} to{" "}
                {format(new Date(reservation.endDate), "PP")}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {reservation.status}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {format(new Date(reservation.createAt), "dd/MM/yyyy")}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {reservation.status !== "Paid" && (
                  <Button
                    label="Cancel"
                    onClick={() => onCancel(reservation.id)}
                    small
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
