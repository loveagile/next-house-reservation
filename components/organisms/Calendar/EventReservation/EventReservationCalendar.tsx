"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import Button from "@mui/material/Button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import EventReservationTableRow from "./EventReservationTableRow";

import { daysStr } from "@/utils/constants";
import { CandidateEventDateTimeAtom, YearMonthAtom } from "@/lib/recoil/EventReserveDateAtom";
import { dayOfWeek, numberOfDays } from "@/utils/convert";
import { useEffect } from "react";

interface ThisFCProps {
  className?: string;
}

const isFirstMonth = (year: number, month: number) => {
  const currentDate = new Date();

  return (
    year === currentDate.getFullYear() && month === currentDate.getMonth() + 1
  );
};

const isLastMonth = (
  year: number,
  month: number,
  lstReserveDate: string
) => {
  const [lstYear, lstMonth, _] = lstReserveDate.split("-");
  return year === Number(lstYear) && month === Number(lstMonth);
};

const EventReservationCalendar: React.FC<ThisFCProps> = ({ className }) => {
  const candidateReserveDates = useRecoilValue(CandidateEventDateTimeAtom);
  const [selectYearMonth, setSelectYearMonth] = useRecoilState(YearMonthAtom);

  const dayOfFirstDay = dayOfWeek(new Date(selectYearMonth.year, selectYearMonth.month - 1, 1));
  const countsOfDays = numberOfDays(selectYearMonth.year, selectYearMonth.month);
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
    <div className={`bg-white items-start border-[1px] mt-3 w-full left-0 ${className}`}>
      <div>
        <div className="w-full flex items-center justify-between bg-black text-white">
          {/* {isFirstMonth(selectYearMonth.year, selectYearMonth.month) ? (
            <div className="w-[calc(100%/7)]"></div>
          ) : (
            <Button variant="outlined" onClick={handlePreviousMonth} sx={{
              padding: "10px 20px",
              fontSize: "20px",
              border: "none",
              width: "calc(100%/7)",
              '&:hover': {
                border: 'none',
              }
            }}
            >
              <MdKeyboardArrowLeft className="text-2xl" />
            </Button>
          )} */}
          <Button variant="outlined" onClick={handlePreviousMonth} sx={{
            padding: "10px 20px",
            fontSize: "20px",
            color: "white",
            border: "none",
            width: "calc(100%/7)",
            '&:hover': {
              border: 'none',
              color: "white",
            }
          }}
          >
            <MdKeyboardArrowLeft className="text-3xl" />
          </Button>
          <p className="font-semibold p-1 text-lg">
            {selectYearMonth.year} 年 {selectYearMonth.month} 月
          </p>
          <Button variant="outlined" onClick={handleNextMonth} sx={{
            padding: "10px 20px",
            fontSize: "20px",
            color: "white",
            border: "none",
            width: "calc(100%/7)",
            '&:hover': {
              border: 'none',
              color: "white",
            }
          }}
          >
            <MdKeyboardArrowRight className="text-3xl" />
          </Button>
          {/* {isLastMonth(selectYearMonth.year, selectYearMonth.month, candidateReserveDates.at(-1)!.date) ? (
            <div className="w-[calc(100%/7)]"></div>
          ) : (
            <Button variant="outlined" onClick={handleNextMonth} sx={{
              padding: "10px 20px",
              fontSize: "20px",
              border: "none",
              width: "calc(100%/7)",
              '&:hover': {
                border: 'none',
              }
            }}
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </Button>
          )} */}
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-none">
              {daysStr.map((day, index) => (
                <th key={index} className="p-2 border-none">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <EventReservationTableRow
              emptyCount={dayOfFirstDay}
              count={numberInFirstRow}
              startIndex={1}
            />
            <EventReservationTableRow count={7} startIndex={numberInFirstRow + 1} />
            <EventReservationTableRow count={7} startIndex={numberInFirstRow + 8} />
            <EventReservationTableRow count={7} startIndex={numberInFirstRow + 15} />
            {numberInFirstRow + 28 <= countsOfDays ? (
              <>
                <EventReservationTableRow count={7} startIndex={numberInFirstRow + 22} />
                <EventReservationTableRow
                  count={countsOfDays - numberInFirstRow - 28}
                  startIndex={numberInFirstRow + 29}
                />
              </>
            ) : (
              <EventReservationTableRow
                count={countsOfDays - numberInFirstRow - 21}
                startIndex={numberInFirstRow + 22}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventReservationCalendar;
