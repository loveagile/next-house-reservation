"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

import Button from "@mui/material/Button";
import TableRow from "./TableRow";

import { daysStr } from "@/utils/constants";
import { dayOfWeek, numberOfDays, eventHoldingPeriod } from "@/utils/convert";
import { EventDateTimeAtom, YearMonthAtom } from "@/lib/recoil/EventReserveDateAtom";

const DateCalendar: React.FC = () => {
  const eventDates = useRecoilValue(EventDateTimeAtom);
  const [selectYearMonth, setSelectYearMonth] =
    useRecoilState(YearMonthAtom);

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
      <p className="font-semibold">
        {selectYearMonth.year} 年 {selectYearMonth.month} 月
      </p>
      <div>
        <div className="w-full flex justify-between mt-3">
          <Button
            variant="outlined"
            onClick={handlePreviousMonth}
            sx={{
              padding: "10px 20px",
              fontSize: "20px",
              borderRadius: "1px",
            }}
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextMonth}
            sx={{
              padding: "10px 20px",
              fontSize: "20px",
              borderRadius: "1px",
            }}
          >
            <MdOutlineKeyboardArrowRight className="text-2xl" />
          </Button>
        </div>
        <table className="w-full mt-5">
          <thead>
            <tr>
              {daysStr.map((day, index) => (
                <th key={index} className="text-sm p-2 w-[calc(100%/7)]">{day}</th>
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
          <p className="text-sm mt-6">
            {eventHoldingPeriod(eventDates)}<br></br>
            上記の期間で開催日が{eventDates.length}日設定されています。

          </p>
        )}
        <div className="flex justify-center items-center">
          <Button type="submit" variant="contained" sx={{
            width: "170px",
            fontSize: "20px",
            padding: "3px 25px",
            margin: "20px 0 10px",
            borderRadius: "1px",
          }}>
            完了
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateCalendar;
