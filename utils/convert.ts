import {
  IEventDateTime,
  IReservationEvent,
  IReservationGroupedEvent,
} from "@/utils/types";
import { IStartEndTimeProps } from "@/components/molecules/Dialog/TimeSetDialog";
import { IReservationTimeProps } from "@/components/molecules/Reservation/ReservationTime";

// ex: (2024, 8, 12)  =>  "月"
export const dayStrOfWeek = (specificDate: Date) => {
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  return weekdays[specificDate.getDay()];
};

// ex: Date  =>  day of the week (0 to 6)  * Sunday = 0, Monday = 1,
export const dayOfWeek = (specificDate: Date) => {
  return specificDate.getDay();
};

// ex: Date => (2024, 09, 03)
export const splitDate = (specificDate: Date) => {
  const year = specificDate.getFullYear();
  const month = (specificDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = specificDate.getDate().toString().padStart(2, "0");

  return {
    year,
    month,
    day,
    weekday: dayStrOfWeek(specificDate),
  };
};

// ex: Time => (08, 09, 03)
export const splitTime = (specificDate: Date) => {
  const hours = specificDate.getHours().toString().padStart(2, "0");
  const minutes = specificDate.getMinutes().toString().padStart(2, "0");
  const seconds = specificDate.getSeconds().toString().padStart(2, "0");

  return {
    hours,
    minutes,
    seconds,
  };
};

// ex: Date  =>  2024年08月15日(木)
export const formatDateToJapaneseString = (date: Date) => {
  const { year, month, day, weekday } = splitDate(date);

  return `${year}年${month}月${day}日(${weekday})`;
};

// ex: 2024-08-15 02:21:46  =>  { date: "2024/08/15(木)", time: "02:21"}
export const formatReservationDateToJapaneseString = (isoTimestamp: string) => {
  const date = new Date(isoTimestamp);
  const { year, month, day, weekday } = splitDate(date);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return {
    date: `${year}/${month}/${day}(${weekday})`,
    time: `${hours}:${minutes}`,
  };
};

// ex: 2024-08-20  =>  2024/08/20(火)
export const formatSlashSplitDateString = (dateStr: string) => {
  const date = new Date(dateStr);
  const convertedStr = dateStr.replaceAll("-", "/");
  const weekday = dayStrOfWeek(date);

  return `${convertedStr}(${weekday})`;
};

// ex: 2024-09-03 23:56:03  =>  2024年09月03日(火) 23:56:03
export const formatISO8601TimestampToJapaneseString = (
  isoTimestamp: string
) => {
  const date = new Date(isoTimestamp);
  const { year, month, day, weekday } = splitDate(date);
  const { hours, minutes, seconds } = splitTime(date);

  return `${year}年${month}月${day}日(${weekday}) ${hours}:${minutes}:${seconds}`;
};

// ex: (2024, 2)  =>  29
export const numberOfDays = (year: number, month: number) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 2) {
    if (year % 400 === 0) return 29;
    if (year % 100 === 0) return 28;
    if (year % 4 === 0) return 29;
    return 28;
  } else return days[month - 1];
};

// ex: 2024-09-03 03:30  =>  Date
export const getFormatDate = (date: string, time: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

// ex: 330  =>  05:30
export const getTimeStr = (elapsedTime: number) => {
  const hour = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
  const minute = String(Math.floor(elapsedTime % 60)).padStart(2, "0");
  return `${hour}:${minute}`;
};

// ex: (2024, 8, 3)  =>  "2024-08-03"
export const getDateStr = (year: number, month: number, day: number) => {
  const monthStr = String(month).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  return `${year}-${monthStr}-${dayStr}`;
};

// ex: 05:30  =>  330
export const getTimeNumber = (elapsedTime: string) => {
  const [hour, minute] = elapsedTime.split(":");
  return Number(hour) * 60 + Number(minute);
};

// ex: [{300, 330}, {600, 720}]  =>  [300, 330, 600, 720]
export const getTimeArray = (startEndTime: IStartEndTimeProps[]) => {
  let timeArray = [];
  for (let i = 0; i < startEndTime.length; i++) {
    timeArray.push(startEndTime[i].startTime);
    timeArray.push(startEndTime[i].endTime);
  }
  return timeArray;
};

// ex: [{"date":"2024-08-30","time":[600,660,780,840]}], 2024, 8, 30  =>  {true, [600,660,780,840], 0}
export const includeEventDate = (
  eventDates: IEventDateTime[],
  selectYear: number,
  selectMonth: number,
  selectDay: number
) => {
  for (let i = 0; i < eventDates.length; i++) {
    const currentEventDate: IEventDateTime = eventDates[i];
    const { date, time } = currentEventDate;
    const [year, month, day] = date.split("-");
    if (
      Number(year) === selectYear &&
      Number(month) === selectMonth &&
      Number(day) === selectDay
    ) {
      return {
        status: true,
        time,
        index: i,
      };
    }
  }
  return {
    status: false,
    time: [600, 1020],
    index: -1,
  };
};

// get candidate reservation date if the date is later than current date and time
export const getCandidateReserveDateTimes = (eventDates: IEventDateTime[]) => {
  let candidates: IEventDateTime[] = [];
  for (let i = 0; i < eventDates.length; i++) {
    const { date, time } = eventDates[i] as IEventDateTime;
    for (let j = 0; j < time.length; j += 2) {
      if (getFormatDate(date, getTimeStr(time[j])) >= new Date()) {
        candidates.push({
          date,
          time: time.slice(j),
        });
        break;
      }
    }
  }
  return candidates;
};

export const getCandidateReserveTimes = (
  candidateReserveDateTimes: IEventDateTime[],
  selectedDate: string
) => {
  let times: IReservationTimeProps[] = [];

  candidateReserveDateTimes.forEach(({ date, time }) => {
    if (date === selectedDate) {
      for (let i = 0; i < time.length; i += 2) {
        times.push({
          startTime: getTimeStr(time[i]),
          endTime: getTimeStr(time[i + 1]),
        });
      }
    }
  });

  return times;
};

// ex: [{"date":"2024-08-03","time":[120,150,240, 300]},{"date":"2024-08-05","time":[300,420]}]  =>  2024年08月03日(土)〜2024年08月05日(月)
export const eventHoldingPeriod = (
  eventDates: IEventDateTime[] | null
): string => {
  if (!eventDates || eventDates.length === 0) return "";

  const startDate = formatDateToJapaneseString(new Date(eventDates[0].date));
  const endDate = formatDateToJapaneseString(new Date(eventDates.at(-1)!.date));

  return eventDates.length === 1 ? startDate : `${startDate}〜${endDate}`;
};

// 公開, 公開(開催終了), 非公開(下書き), 限定公開
export const convEventStatus = (
  status: string,
  eventDates: IEventDateTime[] | null
): string => {
  if (status === "非公開") return "非公開(下書き)";
  if (!eventDates || eventDates.length === 0) return status;
  const { date, time } = eventDates.at(-1)!;
  const isExpired = getFormatDate(date, getTimeStr(time.at(-2)!)) < new Date();
  return isExpired ? "公開(開催終了)" : status;
};

// ex:
export const groupEventsByEventId = (events: IReservationEvent[]) => {
  const groupedEvents: Record<number, IReservationGroupedEvent> = {};
  events.forEach((event) => {
    const {
      eventId,
      title,
      customerId,
      firstName,
      lastName,
      reserveDate,
      startTime,
      endTime,
    } = event;

    if (!groupedEvents[eventId]) {
      groupedEvents[eventId] = {
        eventId,
        title,
        customers: [],
      };
    }

    groupedEvents[eventId].customers.push({
      customerId,
      firstName,
      lastName,
      reserveDate,
      startTime,
      endTime,
    });
  });

  return Object.values(groupedEvents);
};
