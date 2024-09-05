import { atom } from "recoil";
import { initialEvent } from "@/utils/types";

export const EventAtom = atom({
  key: "eventAtom",
  default: initialEvent,
});
