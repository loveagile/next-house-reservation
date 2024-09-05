import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { CandidateReserveDateAtom, CurrentReserveDateAtom } from "@/lib/recoil/EventDateAtom";
import { getTimeStr } from "@/utils/convert";
import "./ReservationTime.css";

export interface IReservationTimeProps {
  startTime: string;
  endTime: string;
}

interface ISelectBoxProps {
  id: string;
  currentTime: IReservationTimeProps;
  setCurrentTime: (currentTime: IReservationTimeProps) => void;
}

const ReservationTime: React.FC<ISelectBoxProps> = ({
  id,
  currentTime,
  setCurrentTime,
}) => {
  const candidateReserveDates = useRecoilValue(CandidateReserveDateAtom);
  const currentReserveDate = useRecoilValue(CurrentReserveDateAtom);
  const [candidateTimes, setCandidateTimes] = useState<IReservationTimeProps[]>([]);

  useEffect(() => {
    let times: IReservationTimeProps[] = [];
    let isInclude = false;

    for (let i = 0; i < candidateReserveDates.length; i++) {
      const { date, time } = candidateReserveDates[i];
      if (date === currentReserveDate.value) {
        for (let j = 0; j < time.length; j += 2) {
          const startTime = getTimeStr(time[j]);
          const endTime = getTimeStr(time[j + 1]);
          if (currentTime.startTime === startTime && currentTime.endTime === endTime) isInclude = true;
          times.push({
            startTime,
            endTime
          })
        }
      }
    }

    if (times.length > 0 && isInclude === false) {
      setCurrentTime({
        startTime: times[0].startTime,
        endTime: times[0].endTime,
      });
    }
    setCandidateTimes(times);
  }, [currentReserveDate])

  const handleChange = (e: SelectChangeEvent<string>) => {
    const startTime = e.target.value;
    for (let i = 0; i < candidateTimes.length; i++) {
      if (candidateTimes[i].startTime === startTime) {
        setCurrentTime({
          startTime,
          endTime: candidateTimes[i].endTime,
        })
        return;
      }
    }
  }

  return (
    <Select id={id} className="w-[100px]" value={currentTime.startTime} onChange={handleChange}>
      {candidateTimes.map((candidateTime, index) => (
        <MenuItem value={candidateTime.startTime} key={index}>
          {candidateTime.startTime}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ReservationTime;
