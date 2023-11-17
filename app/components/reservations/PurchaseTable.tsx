import { SafePurchase } from "@/app/types";
import { format } from "date-fns";

interface PurchaseTableProps {
  purchases: SafePurchase[];
}

const PurchaseTable = ({ purchases }: PurchaseTableProps) => {
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
              Place
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Booking time
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Date
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={index}>
              <td className="p-4 border-b border-blue-gray-50">{index + 1}</td>
              <td className="p-4 border-b border-blue-gray-50">
                {purchase.reservation.user.name}
              </td>

              <td className="p-4 border-b border-blue-gray-50">
                {purchase.reservation.listing.title}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                From{" "}
                {format(new Date(purchase.reservation.startDate), "dd/MM/yyyy")}{" "}
                to{" "}
                {format(new Date(purchase.reservation.endDate), "dd/MM/yyyy")}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {format(new Date(purchase.createdAt), "dd/MM/yyyy HH:mm")}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {purchase.reservation.totalPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;
