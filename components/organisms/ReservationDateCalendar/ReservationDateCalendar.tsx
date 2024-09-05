"use client";

import { useRecoilState, useRecoilValue } from "recoil";

import Button from "@mui/material/Button";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import ReservationTableRow from "@/components/molecules/ReservationTableRow/ReservationTableRow";

import { daysStr } from "@/utils/constants";
import { CandidateReserveDateAtom, SelectYearMonthAtom } from "@/lib/recoil/EventDateAtom";
import { dayOfWeek, numberOfDays } from "@/utils/convert";

import "./ReservationDateCalendar.css";

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

const ReservationDateCalendar: React.FC<ThisFCProps> = ({ className }) => {
  const candidateReserveDates = useRecoilValue(CandidateReserveDateAtom);
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
    <div className={`bg-white items-start border-[1px] mt-3 w-full left-0 ${className}`}>
      <div>
        <div className="w-full flex items-center justify-between">
          {isFirstMonth(selectYearMonth.year, selectYearMonth.month) ? (
            <div className="empty_div"></div>
          ) : (
            <Button
              className="date_btn"
              variant="outlined"
              onClick={handlePreviousMonth}
            >
              <KeyboardArrowLeftRoundedIcon className="arrow_icon" />
            </Button>
          )}
          <p className="font-semibold p-1">
            {selectYearMonth.year} 年 {selectYearMonth.month} 月
          </p>
          {isLastMonth(selectYearMonth.year, selectYearMonth.month, candidateReserveDates[candidateReserveDates.length - 1].date) ? (
            <div className="empty_div"></div>
          ) : (
            <Button
              className="date_btn"
              variant="outlined"
              onClick={handleNextMonth}
            >
              <KeyboardArrowRightRoundedIcon className="arrow_icon" />
            </Button>
          )}
        </div>
        <table className="calendar_table">
          <thead>
            <tr>
              {daysStr.map((day, index) => (
                <th key={index} className="calendar_th">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <ReservationTableRow
              emptyCount={dayOfFirstDay}
              count={numberInFirstRow}
              startIndex={1}
            />
            <ReservationTableRow count={7} startIndex={numberInFirstRow + 1} />
            <ReservationTableRow count={7} startIndex={numberInFirstRow + 8} />
            <ReservationTableRow count={7} startIndex={numberInFirstRow + 15} />
            {numberInFirstRow + 28 <= countsOfDays ? (
              <>
                <ReservationTableRow count={7} startIndex={numberInFirstRow + 22} />
                <ReservationTableRow
                  count={countsOfDays - numberInFirstRow - 28}
                  startIndex={numberInFirstRow + 29}
                />
              </>
            ) : (
              <ReservationTableRow
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

export default ReservationDateCalendar;
