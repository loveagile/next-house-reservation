"use client";

import React, { useEffect, useState } from "react";
import { useForm, Control } from "react-hook-form";
import { useRecoilState } from "recoil";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

import { timesStr } from "@/utils/constants";
import { EventDateAtom } from "@/lib/recoil/EventDateAtom";
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
              value={getTimeStr(time.startTime)}
              onChange={(e) => handleStartTimeChange(e, timeIndex)}
              sx={{
                maxWidth: "100px",
                '& .MuiSelect-select': {
                  padding: '5px 15px',
                  minWidth: '170px',
                },
              }}
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
              sx={{
                maxWidth: "100px",
                '& .MuiSelect-select': {
                  padding: '5px 15px',
                  minWidth: '170px',
                },
              }}
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
              variant="contained"
              onClick={() => onEventTimeRemove(timeIndex)}
              sx={{
                width: "100px",
                fontSize: "12px",
                padding: "3px 0 2px",
                marginTop: "15px",
                borderRadius: "1px",
                backgroundColor: "#e73939",
                '&:hover': {
                  backgroundColor: "#e73939",
                  opacity: 0.9,
                }
              }}
            >
              設定を削除する
            </Button>
          )}
        </div>
      ))}
      <Button
        variant="contained"
        onClick={onEventTimeAdd}
        sx={{
          width: "170px",
          fontSize: "16px",
          padding: "3px 25px",
          marginTop: "20px",
          borderRadius: "1px",
          backgroundColor: "#bbb",
          '&:hover': {
            backgroundColor: "#bbb",
            opacity: 0.9,
          }
        }}
      >
        設定を追加する
      </Button>
      <p className="mt-5 text-sm font-normal">※件数の予約上限に達すると、その時間帯は予約できないようになります。</p>
      <Button
        variant="contained"
        onClick={onRegister}
        sx={{
          width: "170px",
          fontSize: "20px",
          padding: "3px 25px",
          marginTop: "20px",
          borderRadius: "1px",
        }}
      >
        登録する
      </Button>
    </form>
  )
};

export default TimeSetDialog;
