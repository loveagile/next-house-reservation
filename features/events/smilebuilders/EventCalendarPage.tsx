"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { useRecoilState, useRecoilValue } from "recoil";

import { Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import Loading from "@/components/molecules/loading";
import EventReservationCalendar from "@/components/organisms/Calendar/EventReservation/EventReservationCalendar";
import EventReservationButton from "@/components/organisms/Calendar/EventReservation/EventReservationButton";

import { IEventDateTime } from "@/utils/types";
import { IReservationTimeProps } from "@/components/molecules/Reservation/ReservationTime";
import { CandidateEventDateTimeAtom, ReserveDateAtom, ReserveTimeAtom } from "@/lib/recoil/EventReserveDateAtom";
import { getCandidateReserveDateTimes, getCandidateReserveTimes } from "@/utils/convert";

const EventCalendarPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [candidateReserveDateTimes, setCandidateReserveDateTimes] = useRecoilState(CandidateEventDateTimeAtom);
  const [candidateTimes, setCandidateTimes] = useState<IReservationTimeProps[]>([]);
  const reserveDate = useRecoilValue(ReserveDateAtom);
  const [reserveTime, setReserveTime] = useRecoilState(ReserveTimeAtom);
  const [selectTimeStrs, setSelectTimeStrs] = useState<string[]>(['予約したい時刻を選択']);

  useEffect(() => {
    const fetchEventDetail = async () => {
      setIsLoading(true);

      const res = await axios.post("/api/events/detail", { id, });
      if (res.status === 200) {
        const data = res.data[0];
        const candidates: IEventDateTime[] = getCandidateReserveDateTimes(JSON.parse(data.eventDate));
        setCandidateReserveDateTimes(candidates);
      }

      setReserveTime({
        startTime: '予約したい時刻を選択',
        endTime: '',
      })
      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  // Set Candidate Times
  useEffect(() => {
    let times: IReservationTimeProps[] = getCandidateReserveTimes(candidateReserveDateTimes, reserveDate.value);
    setCandidateTimes(times);
    setSelectTimeStrs([
      '予約したい時刻を選択',
      ...times.map((time) => time.startTime),
    ])
  }, [candidateReserveDateTimes, reserveDate.value]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const startTime = e.target.value;

    if (startTime === '予約したい時刻を選択') {
      setReserveTime({
        startTime: '予約したい時刻を選択',
        endTime: '',
      })
    }

    for (let i = 0; i < candidateTimes.length; i++) {
      if (candidateTimes[i].startTime === startTime) {
        setReserveTime({
          startTime,
          endTime: candidateTimes[i].endTime,
        })
        return;
      }
    }
  }

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <section className="flex flex-col w-full justify-center max-w-[640px] mx-auto">
        <EventReservationCalendar />
        <div className="mt-4 text-sm">
          <span className="text-[#2aa6e2]">◎</span>：即予約可
          <span className="text-[#2aa6e2] ml-4">残1~2</span>：即予約可（残りわずか）
          <span className="ml-4">–</span>：予約不可
          <span className="ml-4">×</span>：予約一杯
          <p className="flex items-center mt-1">
            <FaPhone className="text-[#2aa6e2] text-lg" />
            <span>：要問い合わせ（TEL：</span>
            <Link href="tel:0995-45-7777" className="text-[#2aa6e2]">0995-45-7777</Link>
            <span>）</span>
          </p>
        </div>
        <div className="mt-4">
          <p className="mb-4 text-sm">※日付を選ぶと予約時刻を選択できるようになります。</p>
          <Select id="time" className="w-[70%]"
            value={reserveTime.startTime}
            disabled={selectTimeStrs.length === 1}
            onChange={handleChange} sx={{
              '& .MuiSelect-select': {
                padding: '8px 15px',
                minWidth: '170px',
                fontSize: '15px',
              },
              '& .Mui-disabled': {
                background: '#e6e6e6',
              }
            }}>
            {selectTimeStrs.map((selectTime, index) => (
              <MenuItem value={selectTime} key={index} sx={{
                fontSize: '15px',
              }}>
                {selectTime}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mt-4">
          <EventReservationButton id={Number(id)} isExist={candidateReserveDateTimes.length > 0} />
        </div>
      </section>
    )
  );
};

export default EventCalendarPage;
