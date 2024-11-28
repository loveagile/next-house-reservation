"use client";

import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

import { Button, Dialog, DialogActions, DialogTitle, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { ReserveDateAtom, ReserveTimeAtom } from "@/lib/recoil/EventReserveDateAtom";

interface ThisFCProps {
  id: number;
  isExist: boolean;
  eventURL: string | string[];
}

const EventReservationButton: React.FC<ThisFCProps> = ({ id, isExist, eventURL }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const reserveDate = useRecoilValue(ReserveDateAtom);
  const reserveTime = useRecoilValue(ReserveTimeAtom);

  const handleReserveClick = () => {
    if (!reserveDate.value || reserveTime.startTime === "予約したい時刻を選択" || !reserveTime.endTime) {
      setOpen(true);
      return;
    }
    localStorage.setItem("eventReserveData", JSON.stringify({
      reserveDate: reserveDate.value,
      startTime: reserveTime.startTime,
      endTime: reserveTime.endTime,
    }));
    router.push(`/${eventURL}/events/${id}/reserve`);
  }

  return (
    isExist ? (
      <>
        <Button onClick={handleReserveClick} sx={{
          width: "100%",
          maxWidth: "640px",
          fontWeight: "600",
          backgroundColor: "#2563EB",
          color: "white",
          fontSize: "18px",
          padding: "6px",
          '&:hover': {
            backgroundColor: "#2563EB",
            opacity: 0.9,
            transition: "all 0.3s ease-out"
          }
        }}>予約する</Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            '& .MuiDialog-paper': {
              minWidth: "600px",
            }
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: "700",
              textAlign: "center",
              paddingTop: "30px",
              color: "#555",
              fontSize: "18px",
              letterSpacing: "1px",
            }}
          >
            予約日時を選択してください
          </DialogTitle>
          <DialogActions sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0 30px",
          }}>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              sx={{
                borderRadius: "1px",
                padding: "5px 20px",
                backgroundColor: "#2563EB",
                '&:hover': {
                  backgroundColor: "#2563EB",
                  opacity: 0.8,
                }
              }}
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
      </>
    ) : (
      <Button disabled sx={{
        width: "100%",
        maxWidth: "640px",
        fontWeight: "600",
        backgroundColor: "#2563EB",
        color: "white",
        fontSize: "18px",
        padding: "6px",
        '&:disabled': {
          color: "white",
        }
      }}>終了しました</Button>
    )
  );
};

export default EventReservationButton;
