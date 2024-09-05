import { atom } from "recoil";
import { IEvent } from "@/utils/types";

const initialEventItem: IEvent = {
  id: -1,
  title: "",
  type: "",
  format: "",
  attend: 0,
  eventDate: "",
  note: "",
  status: "非公開",
  priority: 0,
  prefecture: "",
  address1: "",
  address2: "",
  hiddenAddress: "",
  images: "",
  mainIndex: 0,
  FPImages: "",
  tag: "",
  feature: "",
  benefit: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

export const EventAtom = atom({
  key: "eventAtom",
  default: initialEventItem,
});
