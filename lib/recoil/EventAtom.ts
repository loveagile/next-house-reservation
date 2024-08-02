import { atom } from "recoil";

interface ICurrentItemProps {
  prefecture: string;
  address1: string;
  address2: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  attend: number;
  eventDate: string;
  format: string;
  note?: string;
  status: string;
  tag?: string;
  feature?: string;
  benefit?: string;
  title: string;
  type: string;
  imgUrl?: string;
  floorImgs?: string;
  priority: number;
}

const initialEventItem: ICurrentItemProps = {
  prefecture: "",
  address1: "",
  address2: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  attend: 0,
  eventDate: "",
  format: "",
  note: "",
  status: "非公開(下書き)",
  tag: "",
  feature: "",
  benefit: "",
  title: "",
  type: "",
  imgUrl: "",
  floorImgs: "",
  priority: 0,
};

export const EventAtom = atom({
  key: "eventAtom",
  default: initialEventItem,
});
