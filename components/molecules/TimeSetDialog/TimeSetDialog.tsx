"use client";

import React, { useEffect, useState } from "react";
import { useForm, Control } from "react-hook-form";
import { useRecoilState } from "recoil";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';


import { EventDateAtom } from "@/lib/recoil/EventDateAtom";
import { timesStr } from "@/utils/constants";

import "./TimeSetDialog.css";
import { getTimeArray, getTimeNumber, getTimeStr } from "@/utils/convert";

interface ITimeSetDialogProps {
  time: number[];
  date: string;
  setOpen: (open: boolean) => void;
  index: number;
}

export interface IStartEndTimeProps {
  startTime: number;
  endTime: number;
}

const TimeSetDialog: React.FC<ITimeSetDialogProps> = ({ time, date, setOpen, index }) => {
  const [eventDates, setEventDates] = useRecoilState(EventDateAtom);
  const [startEndTime, setStartEndTime] = useState<IStartEndTimeProps[]>([]);
  const [timeError, setTimeError] = useState<string>("");

  useEffect(() => {
    const convertedTimes = [];
    for (let i = 0; i < time.length; i += 2) {
      convertedTimes.push({ startTime: time[i], endTime: time[i + 1] });
    }
    setStartEndTime(convertedTimes);
  }, [])

  const { handleSubmit } = useForm();

  const onEventTimeAdd = () => {
    setStartEndTime(prevState => [
      ...prevState, {
        startTime: 600,
        endTime: 1020,
      }
    ]);
  }

  const onEventTimeRemove = (timeIndex: number) => {
    setStartEndTime([
      ...startEndTime.slice(0, timeIndex),
      ...startEndTime.slice(timeIndex + 1),
    ]);
  }

  const handleStartTimeChange = (event: SelectChangeEvent, timeIndex: number) => {
    const selectedStartTime = getTimeNumber(event.target.value as string);
    setStartEndTime(prevState => [
      ...prevState.slice(0, timeIndex),
      {
        startTime: selectedStartTime,
        endTime: prevState[timeIndex].endTime
      },
      ...prevState.slice(timeIndex + 1),
    ])
  };

  const handleEndTimeChange = (event: SelectChangeEvent, timeIndex: number) => {
    const selectedEndTime = getTimeNumber(event.target.value as string);
    setStartEndTime(prevState => [
      ...prevState.slice(0, timeIndex),
      {
        startTime: prevState[timeIndex].startTime,
        endTime: selectedEndTime,
      },
      ...prevState.slice(timeIndex + 1),
    ])
  }

  const onRegister = () => {
    for (let i = 0; i < startEndTime.length; i++) {
      if (startEndTime[i].startTime >= startEndTime[i].endTime) {
        setTimeError("終了時刻の値が小さくなっています");
        return;
      }
    }
    startEndTime.sort((lhs, rhs) => {
      return lhs.startTime - rhs.startTime;
    });

    for (let i = 0; i < startEndTime.length - 1; i++) {
      if (startEndTime[i].endTime > startEndTime[i + 1].startTime) {
        setTimeError("予約時間が重複しています");
        return;
      }
    }

    setTimeError("");
    if (index === -1) {
      setEventDates(prevState => [
        ...prevState,
        {
          date,
          time: getTimeArray(startEndTime),
        }
      ]);
    } else {
      setEventDates(prevState => [
        ...prevState.slice(0, index),
        {
          date,
          time: getTimeArray(startEndTime),
        },
        ...prevState.slice(index + 1),
      ]);
    }

    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onRegister)} className="flex flex-col w-full">
      {timeError &&
        <p className="border-[1px] border-m-red p-3 text-m-red rounded text-[15px]">
          <InfoRoundedIcon className="mr-1" />{timeError}
        </p>}
      {startEndTime.map((time, timeIndex) => (
        <div key={timeIndex} className="mt-3 pb-5 border-b-[1px] broder-[#ccc]">
          <p>開催時間</p>
          <div className="flex mt-3">
            <Select
              id="startTime"
              className="max-w-[100px]"
              value={getTimeStr(time.startTime)}
              onChange={(e) => handleStartTimeChange(e, timeIndex)}
            >
              {timesStr.map((name, index) => (
                <MenuItem value={name} key={index}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <span className="mx-4">〜</span>
            <Select
              id="endTime"
              className="max-w-[100px]"
              value={getTimeStr(time.endTime)}
              onChange={(e) => handleEndTimeChange(e, timeIndex)}
            >
              {timesStr.map((name, index) => (
                <MenuItem value={name} key={index}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
          {startEndTime.length > 1 && (
            <Button
              className="time_remove_btn"
              variant="contained"
              onClick={() => onEventTimeRemove(timeIndex)}
            >
              設定を削除する
            </Button>
          )}
        </div>
      ))}
      <Button
        className="time_add_btn"
        variant="contained"
        onClick={onEventTimeAdd}
      >
        設定を追加する
      </Button>
      <p className="mt-5 text-[15px] font-normal">※件数の予約上限に達すると、その時間帯は予約できないようになります。</p>
      <Button
        className="update_btn"
        variant="contained"
        onClick={onRegister}
      >
        登録する
      </Button>
    </form>
  )
};

export default TimeSetDialog;
