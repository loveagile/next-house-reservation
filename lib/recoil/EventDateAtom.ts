import { atom } from "recoil";
import { IEventDateTime } from "@/utils/types";

export const EventDateAtom = atom({
  key: "eventDateAtom",
  default: [] as IEventDateTime[],
});

// Current Selected Year & Month
interface ISelectYearMonth {
  year: number;
  month: number;
}

export const SelectYearMonthAtom = atom({
  key: "selectYearMonthAtom",
  default: {
    year: 1980,
    month: 1,
  } as ISelectYearMonth,
});
