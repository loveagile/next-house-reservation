import { atom } from "recoil";

export interface IEventDateTime {
  year: number;
  month: number;
  day: number;
  startTime: string;
  endTime: string;
}

interface ISelectYearMonth {
  year: number;
  month: number;
}

export const EventDateAtom = atom({
  key: "eventDateAtom",
  default: [] as IEventDateTime[],
});

export const SelectYearMonthAtom = atom({
  key: "selectYearMonthAtom",
  default: {
    year: 1980,
    month: 1,
  } as ISelectYearMonth,
});
