import { IEventDateTime } from "@/utils/types";
import { IStartEndTimeProps } from "@/components/molecules/TimeSetDialog/TimeSetDialog";

export const formatDateToJapaneseString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = date.getDate().toString().padStart(2, "0");

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日(${weekday})`;
};

export const formatReservationDateToJapaneseString = (isoTimestamp: string) => {
  const date = new Date(isoTimestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = date.getDate().toString().padStart(2, "0");

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return {
    date: `${year}/${month}/${day}(${weekday})`,
    time: `${hours}:${minutes}`,
  };
};

export const formatDateToJapaneseStringWithTime = (date: Date) => {
  const dateStr = formatDateToJapaneseString(date);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return dateStr + ` ${hours}:${minutes}:${seconds}`;
};

export const formatISO8601TimestampToJapaneseString = (
  isoTimestamp: string
) => {
  const date = new Date(isoTimestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = date.getDate().toString().padStart(2, "0");

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日(${weekday}) ${hours}:${minutes}:${seconds}`;
};

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const numberOfDays = (year: number, month: number) => {
  if (month == 2) {
    if (year % 400 === 0) return 29;
    if (year % 100 === 0) return 28;
    if (year % 4 === 0) return 29;
    return 28;
  } else return days[month - 1];
};

export const dayOfWeek = (specificDate: Date) => {
  return specificDate.getDay();
};

export const eventDateTimeSplit = (dateTimeString: string) => {
  const [datePart, timePart] = dateTimeString.split(" ");
  const [year, month, day] = datePart.split("/").map(Number);
  const [startTime, endTime] = timePart.split("-");
  return {
    year,
    month,
    day,
    startTime,
    endTime,
  };
};

export const getFormatDate = (date: string, time: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

export const getNearestFutureDate = (eventDate: IEventDateTime[]) => {
  let candidateDate = "";
  let candidateTimes = [];

  for (let i = 0; i < eventDate.length; i++) {
    const date = eventDate[i].date;
    const timeArray = eventDate[i].time;
    for (let j = 0; j < timeArray.length; j += 2) {
      const startTime = getTimeStr(timeArray[j]);
      const dateObject = getFormatDate(date, startTime);

      if (new Date() <= dateObject) {
        candidateDate = date;
        for (let k = j; k < timeArray.length; k += 2)
          candidateTimes.push(getTimeStr(timeArray[k]));
        return {
          candidateDate,
          candidateTimes,
        };
      }
    }
  }
  return {
    candidateDate: "",
    candidateTimes: [],
  };
};

export const getTimeStr = (elapsedTime: number) => {
  const hour = String(Math.floor(elapsedTime / 60));
  const minute = String(Math.floor(elapsedTime % 60)).padStart(2, "0");
  return `${hour}:${minute}`;
};

export const getDateStr = (year: number, month: number, day: number) => {
  const monthStr = String(month).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  return `${year}-${monthStr}-${dayStr}`;
};

export const getTimeNumber = (elapsedTime: string) => {
  const [hour, minute] = elapsedTime.split(":");
  return Number(hour) * 60 + Number(minute);
};

export const getTimeArray = (startEndTime: IStartEndTimeProps[]) => {
  let timeArray = [];
  for (let i = 0; i < startEndTime.length; i++) {
    timeArray.push(startEndTime[i].startTime);
    timeArray.push(startEndTime[i].endTime);
  }
  return timeArray;
};

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
