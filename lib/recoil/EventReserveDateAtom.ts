import { atom } from "recoil";
import { IEventDateTime } from "@/utils/types";

export const EventDateTimeAtom = atom({
  key: "EventDateTimeAtom",
  default: [] as IEventDateTime[],
});

const currentDate = new Date();

export const YearMonthAtom = atom({
  key: "YearMonthAtom",
  default: {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  } as {
    year: number;
    month: number;
  },
});

export const CandidateEventDateTimeAtom = atom({
  key: "CandidateEventDateTimeAtom",
  default: [] as IEventDateTime[],
});

export const ReserveDateAtom = atom({
  key: "ReserveDateAtom",
  default: {
    value: "",
    isOpen: false,
  } as {
    value: string;
    isOpen: boolean;
  },
});

export const ReserveTimeAtom = atom({
  key: "ReserveTimeAtom",
  default: {
    startTime: "",
    endTime: "",
  } as {
    startTime: string;
    endTime: string;
  },
});
