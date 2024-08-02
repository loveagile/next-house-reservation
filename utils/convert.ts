import { IEventDateTime } from "@/lib/recoil/EventDateAtom";

export const formatDateToJapaneseString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = date.getDate().toString().padStart(2, "0");

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日(${weekday})`;
};

export const formatDateToJapaneseStringWithTime = (date: Date) => {
  const dateStr = formatDateToJapaneseString(date);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return dateStr + ` ${hours}:${minutes}:${seconds}`;
};

export const formatISO8601TimestampToJapaneseString = (isoTimestamp: string) => {
  const date = new Date(isoTimestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const day = date.getDate().toString().padStart(2, '0');

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日(${weekday}) ${hours}:${minutes}:${seconds}`;
}

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

export const getReservationPeriod = (eventDates: IEventDateTime[]) => {
  const reservationDates = eventDates.map(
    (date) => new Date(date.year, date.month - 1, date.day)
  );
  reservationDates.sort((a, b) => a.getTime() - b.getTime());
  const count = reservationDates.length;
  let ret = formatDateToJapaneseString(reservationDates[0]);
  if (count > 1)
    ret += "〜" + formatDateToJapaneseString(reservationDates[count - 1]);
  return ret;
};

export const formatEventDateTime = (event: IEventDateTime) => {
  const { year, month, day, startTime, endTime } = event;
  return `${year}/${month}/${day} ${startTime}-${endTime}`;
};

export const formatDateToDBString = (eventDates: IEventDateTime[]) => {
  const eventDateStrings = eventDates.map((event) =>
    formatEventDateTime(event)
  );
  return eventDateStrings.join(", ");
};

export const includeEventDate = (
  eventDates: IEventDateTime[],
  selectYear: number,
  selectMonth: number,
  selectDay: number
) => {
  for (let i = 0; i < eventDates.length; i++) {
    const currentEventDate: IEventDateTime = eventDates[i];
    const { year, month, day, startTime, endTime } = currentEventDate;
    if (year === selectYear && month === selectMonth && day === selectDay) {
      return {
        status: true,
        startTime,
        endTime,
        index: i,
      };
    }
  }
  return {
    status: false,
    startTime: "10:00",
    endTime: "17:00",
    index: -1,
  };
};
