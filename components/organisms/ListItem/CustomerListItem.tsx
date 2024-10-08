import Link from "next/link";
import { FaMapMarker, FaPhoneAlt, FaPencilAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import CustomerDelBtn from "@/components/atoms/Button/CustomerDelBtn";

import { formatReservationDateToJapaneseString } from "@/utils/convert";
import { ICustomer } from "@/utils/types";

interface ThisFCProps {
  item: ICustomer;
  setDeleteItemId: (id: number) => void;
}

const CustomerListItem: React.FC<ThisFCProps> = ({ item, setDeleteItemId }) => {
  const {
    id, status, route,
    lastName, firstName, seiName, meiName,
    zipCode, prefecture, city, street, building,
    email, phone, birthYear, birthMonth, birthDate,
    note, memo, employee, delivery,
    createdAt, updatedAt
  } = item;

  const { date: createDate, time: createTime } = formatReservationDateToJapaneseString(createdAt.toString());

  return (
    <tr className="w-full text-sm">
      <td className="p-2 text-center">{status}</td>
      <td className="p-2">
        {createDate.replaceAll("-", "/")}<br></br>{createTime}
      </td>
      <td className="p-2 text-center">
        <span className="border-[1px] border-[#2fa8b5] text-[#2fa8b5] px-2 py-1 rounded">{route}</span>
      </td>
      <td className="p-3 text-center">
        <Link href={`/customers/${id}`} className="text-m-blue underline">{lastName}{firstName}</Link>
      </td>
      <td className="px-2 py-8">
        <p className="flex items-center">
          <FaMapMarker />
          <span className="ml-1">
            {prefecture || ""}{city || ""}{street || ""}{building || ""}
          </span>
        </p>
        <p className="flex items-center mt-1">
          <FaPhoneAlt />
          <span className="ml-1">{phone}</span>
        </p>
      </td>
      <td className="p-2 text-center">{delivery}</td>
      <td className="p-2 text-center">{note}</td>
      <td className="p-2 text-center">
        {employee === "システム管理者" && "システム管理者"}
      </td>
      <td className="p-2 text-center">
        <Button
          href={`/customers/${id}/edit`}
          variant="contained"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#2296f3",
            padding: "3px",
            fontSize: "12px",
            marginBottom: "12px",
            borderRadius: "1px",
            '&:hover': {
              backgroundColor: "#2296f3",
              opacity: 0.9,
            }
          }}
        >
          <FaPencilAlt className="text-sm" />
          <span className="ml-[6px]">編集</span>
        </Button>
        <CustomerDelBtn id={id} setDeleteItemId={setDeleteItemId} />
      </td>
    </tr>
  );
};

export default CustomerListItem;
