import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";

import { Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { CandidateEventDateTimeAtom, ReserveDateAtom, ReserveTimeAtom } from "@/lib/recoil/EventReserveDateAtom";
import { getCandidateReserveTimes } from "@/utils/convert";

export interface IReservationTimeProps {
  startTime: string;
  endTime: string;
}

const ReservationTime = () => {
  const candidateReserveDateTimes = useRecoilValue(CandidateEventDateTimeAtom);
  const reserveDate = useRecoilValue(ReserveDateAtom);
  const [reserveTime, setReserveTime] = useRecoilState(ReserveTimeAtom);
  const [candidateTimes, setCandidateTimes] = useState<IReservationTimeProps[]>([]);

  // Set Candidate Times
  useEffect(() => {
    let times: IReservationTimeProps[] = getCandidateReserveTimes(candidateReserveDateTimes, reserveDate.value);
    setCandidateTimes(times);
  }, [candidateReserveDateTimes, reserveDate.value]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const startTime = e.target.value;
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
    <Select id="time" className="w-[100px]"
      value={reserveTime.startTime}
      onChange={handleChange} sx={{
        '& .MuiSelect-select': {
          padding: '3px 15px',
          minWidth: '170px',
          fontSize: '15px',
        },
      }}>
      {candidateTimes.map((candidateTime, index) => (
        <MenuItem value={candidateTime.startTime} key={index} sx={{
          fontSize: '15px',
        }}>
          {candidateTime.startTime}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ReservationTime;
