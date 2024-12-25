import Link from "next/link";

import { formatReservationDateToJapaneseString } from "@/utils/convert";
import { IGroupCustomer } from "@/features/group/CustomerGroupPage";

interface ThisFCProps {
  item: IGroupCustomer;
}

const CustomerGroupListItem: React.FC<ThisFCProps> = ({ item }) => {
  const {
    id, companyName, route,
    lastName, firstName,
    prefecture, city, street, building,
    phone, note, delivery, createdAt
  } = item;

  const { date: createDate, time: createTime } = formatReservationDateToJapaneseString(createdAt.toString());
  const address = (prefecture || "") + (city || "") + (street || "") + (building || "");

  return (
    <tr className="w-full text-sm">
      <td className="p-2 text-center">{companyName}</td>
      <td className="p-2">
        {createDate.replaceAll("-", "/")}<br></br>{createTime}
      </td>
      <td className="p-2 text-center">
        <span className="border-[1px] border-[#2fa8b5] text-[#2fa8b5] px-2 py-1 rounded">{route}</span>
      </td>
      <td className="p-3 text-center">
        <Link href={`/customers/${id}`} className="text-m-blue underline">{lastName}{firstName}</Link>
      </td>
      <td className="p-3">
        <p className="flex items-center">
          <span className="ml-1">
            {address ? address : <br />}
          </span>
        </p>
        <p className="flex items-center mt-1">
          <span className="ml-1">{phone}</span>
        </p>
      </td>
      <td className="p-2 text-center">{delivery}</td>
      <td className="p-2 text-center">{note}</td>
    </tr>
  );
};

export default CustomerGroupListItem;
