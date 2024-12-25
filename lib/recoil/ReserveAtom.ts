import { atom } from "recoil";

interface IReserveItemProps {
  eventId: number;
  customerId: number;
  title: string;
  type: string;
  format: string;
  eventDate: string;
  images: string;
  mainIndex: number;

  reserveDate: string;
  startTime: string;
  endTime: string;
  note?: string;
  memo?: string;

  lastName: string;
  firstName: string;
  seiName: string;
  meiName: string;
  zipCode: string;
  prefecture: string;
  city: string;
  street: string;
  building: string;
  email: string;
  phone: string;
  isDelivery: boolean;
  employee: string;
  receptionAt: string;
}

const initialReserveItem: IReserveItemProps = {
  eventId: -1,
  customerId: -1,
  title: "",
  type: "",
  format: "",
  eventDate: "",
  images: "",
  mainIndex: 0,

  reserveDate: "",
  startTime: "",
  endTime: "",
  note: "",
  memo: "",

  lastName: "",
  firstName: "",
  seiName: "",
  meiName: "",
  zipCode: "",
  prefecture: "",
  city: "",
  street: "",
  building: "",
  email: "",
  phone: "",
  isDelivery: false,

  employee: "",
  receptionAt: "",
};

export const ReserveAtom = atom({
  key: "reserveAtom",
  default: initialReserveItem,
});
