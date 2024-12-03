"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuPhone } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";
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
  const { id, event_url } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [candidateReserveDateTimes, setCandidateReserveDateTimes] = useRecoilState(CandidateEventDateTimeAtom);
  const [candidateTimes, setCandidateTimes] = useState<IReservationTimeProps[]>([]);
  const reserveDate = useRecoilValue(ReserveDateAtom);
  const [reserveTime, setReserveTime] = useRecoilState(ReserveTimeAtom);
  const [selectTimeStrs, setSelectTimeStrs] = useState<string[]>(['予約したい時刻を選択']);
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    const fetchEventDetail = async () => {
      setIsLoading(true);

      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        const data = res.data[0];

        const userID = data.userID;
        const { data: user } = await axios.post("/api/auth/detail", {
          id: userID,
        });
        if (user.eventURL !== event_url) {
          router.push("/404");
        }

        setPhone(user.phone);
        const candidates: IEventDateTime[] = getCandidateReserveDateTimes(JSON.parse(data.eventDate));
        setCandidateReserveDateTimes(candidates);

        setReserveTime({
          startTime: '予約したい時刻を選択',
          endTime: '',
        })
      }
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
        <EventReservationCalendar phone={phone} />
        <div className="bg-[#EFF6FF] mt-4 p-2">
          <div className="flex text-sm gap-2 rounded">
            <p className="flex-1 bg-white p-2 rounded"><span className="text-[#2563EB] mr-1">○</span>即予約可</p>
            <p className="flex-1 bg-white p-2 rounded"><span className="text-[#F97316] mr-2">残1~2</span>残りわずか</p>
            <p className="flex-1 bg-white p-2 rounded"><span className="mr-1">–</span>予約不可</p>
            <p className="flex-1 bg-white p-2 rounded"><span className="mr-1 text-[#EF4444]">×</span>予約一杯</p>
          </div>
          <p className="flex items-center mt-2 bg-white text-[#3B82F6] text-sm p-2 rounded">
            <LuPhone className="text-lg mr-2" />
            <span className="mr-2">お問い合わせ：</span>
            <Link href={`tel:${phone}`}>{phone}</Link>
          </p>
        </div>
        <div className="mt-4">
          <p className="flex items-center mb-4 text-sm">
            <IoIosInformationCircleOutline className="text-lg mr-1" />
            <span>日付を選択すると、予約可能な時間帯が表示されます</span>
          </p>
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
          <EventReservationButton id={Number(id)} isExist={candidateReserveDateTimes.length > 0} eventURL={event_url} />
        </div>
      </section>
    )
  );
};

export default EventCalendarPage;
