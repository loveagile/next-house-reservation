import Link from "next/link";

import Button from "@mui/material/Button";
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

import CustomerDelBtn from "@/components/atoms/Button/CustomerDelBtn";

import { formatReservationDateToJapaneseString } from "@/utils/convert";
import { ICustomer } from "@/utils/types";

import "./CustomerListItem.css";

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
          <PlaceIcon className="mr-1" />
          <span>{prefecture || ""}{city || ""}{street || ""}{building || ""}</span>
        </p>
        <p className="flex items-center mt-1">
          <LocalPhoneIcon className="mr-1" />
          <span>{phone}</span>
        </p>
      </td>
      <td className="p-2 text-center">{delivery}</td>
      <td className="p-2 text-center">{note}</td>
      <td className="p-2 text-center">
        {employee === "システム管理者" && "システム管理者"}
      </td>
      <td className="p-2 text-center">
        <Button
          className="w-full flex items-center bg-link-color hover:bg-link-color hover:opacity-80 pt-[2px] pb-1 text-xs rounded-sm mb-3"
          href={`/customers/${id}/edit`}
          variant="contained">
          <ModeEditRoundedIcon className="mr-1" />編集
        </Button>
        <CustomerDelBtn id={id} setDeleteItemId={setDeleteItemId} />
      </td>
    </tr>
  );
};

export default CustomerListItem;
