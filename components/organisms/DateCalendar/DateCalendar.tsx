"use client";

import { useRecoilState, useRecoilValue } from "recoil";

import Button from "@mui/material/Button";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import TableRow from "@/components/molecules/TableRow/TableRow";

import { daysStr } from "@/utils/constants";
import { EventDateAtom, SelectYearMonthAtom } from "@/lib/recoil/EventDateAtom";
import { dayOfWeek, numberOfDays, formatDateToJapaneseString } from "@/utils/convert";

import "./DateCalendar.css";

const DateCalendar: React.FC = () => {
  const eventDates = useRecoilValue(EventDateAtom);
  const [selectYearMonth, setSelectYearMonth] =
    useRecoilState(SelectYearMonthAtom);

  const dayOfFirstDay = dayOfWeek(
    new Date(selectYearMonth.year, selectYearMonth.month - 1, 1)
  );
  const countsOfDays = numberOfDays(
    selectYearMonth.year,
    selectYearMonth.month
  );

  const numberInFirstRow = 7 - dayOfFirstDay;

  const handlePreviousMonth = () => {
    let year = selectYearMonth.year;
    let month = selectYearMonth.month - 1;
    if (month == 0) {
      year -= 1;
      month = 12;
    }
    setSelectYearMonth({
      year,
      month,
    });
  };

  const handleNextMonth = () => {
    let year = selectYearMonth.year;
    let month = selectYearMonth.month + 1;
    if (month == 13) {
      year += 1;
      month = 1;
    }
    setSelectYearMonth({
      year,
      month,
    });
  };

  return (
    <div className="bg-white items-start mt-5 p-5 w-full">
      <p className="text-[15px] font-semibold">
        {selectYearMonth.year} 年 {selectYearMonth.month} 月
      </p>
      <div>
        <div className="w-full flex justify-between mt-3">
          <Button
            className="date_btn"
            variant="outlined"
            onClick={handlePreviousMonth}
          >
            <KeyboardArrowLeftRoundedIcon />
          </Button>
          <Button
            className="date_btn"
            variant="outlined"
            onClick={handleNextMonth}
          >
            <KeyboardArrowRightRoundedIcon />
          </Button>
        </div>
        <table className="mt-5 calendar_table">
          <thead>
            <tr>
              {daysStr.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableRow
              emptyCount={dayOfFirstDay}
              count={numberInFirstRow}
              startIndex={1}
            />
            <TableRow count={7} startIndex={numberInFirstRow + 1} />
            <TableRow count={7} startIndex={numberInFirstRow + 8} />
            <TableRow count={7} startIndex={numberInFirstRow + 15} />
            {numberInFirstRow + 28 <= countsOfDays ? (
              <>
                <TableRow count={7} startIndex={numberInFirstRow + 22} />
                <TableRow
                  count={countsOfDays - numberInFirstRow - 28}
                  startIndex={numberInFirstRow + 29}
                />
              </>
            ) : (
              <TableRow
                count={countsOfDays - numberInFirstRow - 21}
                startIndex={numberInFirstRow + 22}
              />
            )}
          </tbody>
        </table>
        {eventDates.length > 0 && (
          <p className="text-[15px] mt-6">
            {formatDateToJapaneseString(new Date(eventDates[0].date))}
            {eventDates.length > 1 && (
              `〜${formatDateToJapaneseString(new Date(eventDates[eventDates.length - 1].date))}`
            )}
            <br></br>
            上記の期間で開催日が{eventDates.length}日設定されています。

          </p>
        )}
        <div className="flex justify-center items-center">
          <Button type="submit" className="finish_btn" variant="contained">
            完了
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateCalendar;
