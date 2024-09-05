"use client";

import axios from "axios";
import { useState, useRef } from "react";
import Image from "next/image";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Radio from '@mui/material/Radio';
import { FormControlLabel, Checkbox } from '@mui/material';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import RadioGroup from '@mui/material/RadioGroup';

import { IStatusProps } from "../../molecules/SideBar/EventStatusSideBar";

interface ThisFCProps {
  id: number;
  campaignStatus: IStatusProps;
  setCampaignStatus: (campaignStatus: IStatusProps) => void;
  isBack?: boolean;
}

const CampaignPublicBtn: React.FC<ThisFCProps> = ({ id, campaignStatus, setCampaignStatus, isBack = false }) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const embedCheckboxRef = useRef<HTMLInputElement>(null);
  const iemiruCheckboxRef = useRef<HTMLInputElement>(null);
  const radioGroupRef = useRef<HTMLDivElement>(null);

  const handleUpdate = async () => {
    let embedChecked = embedCheckboxRef.current?.checked || false;
    let iemiruChecked = iemiruCheckboxRef.current?.checked || false;
    let selectedRadio = (radioGroupRef.current?.querySelector('input[type="radio"]:checked') as HTMLInputElement).value;
    if (selectedRadio !== "公開") {
      embedChecked = iemiruChecked = false;
    } else if (embedChecked === false && iemiruChecked === false) {
      selectedRadio = "限定公開";
    }
    setCampaignStatus({
      status: selectedRadio,
      isEmbed: embedChecked,
      isIemiru: iemiruChecked,
    })

    await axios.post("/api/campaigns/update", {
      id,
      field_name: "status",
      field_value: selectedRadio,
    })

    await axios.post("/api/campaigns/update", {
      id,
      field_name: "statusBit",
      field_value: 2 * Number(embedChecked) + Number(iemiruChecked),
    })
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{
        backgroundColor: "#0098ba",
        border: "1px solid #0098ba",
        padding: "5px 20px",
        fontSize: "14px",
        marginBottom: "12px",
        borderRadius: "1px",
        '&:hover': {
          backgroundColor: "#0098ba",
        }
      }}
      >
        公開設定
      </Button >
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: "750px",
          }
        }}
      >
        <Button
          className="absolute right-1 top-1 min-w-0 text-[#95979c]"
          onClick={() => setOpen(false)}
        >
          <CloseRoundedIcon />
        </Button>
        <DialogTitle
          sx={{
            fontWeight: "700",
            textAlign: "center",
            borderBottom: "1px solid #eee",
            paddingBottom: "16px",
            fontSize: "18px",
          }}
        >
          公開設定
        </DialogTitle>
        <DialogContent sx={{
          paddingTop: "33px !important",
        }}>
          <RadioGroup name="use-radio-group"
            defaultValue={campaignStatus.status}
            ref={radioGroupRef}
            className="pl-5 text-black "
          >
            <div className="border-[1px] rounded border-[#eee] relative">
              <div className="flex items-center absolute left-[-4px] top-[-15px] bg-white px-1">
                <FormControlLabel
                  value="公開"
                  control={<Radio />}
                  label="公開"
                  sx={{
                    marginRight: "5px",
                    '& .MuiSvgIcon-root': {
                      width: "18px",
                      height: "18px",
                    }
                  }}
                />
                <RemoveRedEyeIcon sx={{
                  color: "#2aac6d",
                  fontSize: "22px",
                  margin: "4px 0",
                }} />
              </div>
              <div className="flex flex-col px-6 py-4 gap-1">
                <FormControlLabel control={<Checkbox defaultChecked={campaignStatus.isEmbed}
                  inputRef={embedCheckboxRef} />} label="埋込先HPへ公開する" sx={{
                    '& .MuiFormControlLabel-label': {
                      marginLeft: "8px",
                      letterSpacing: "1px",
                    },
                    '& .MuiCheckbox-root': {
                      padding: 0,
                    }
                  }} />
                <FormControlLabel control={<Checkbox defaultChecked={campaignStatus.isIemiru}
                  inputRef={iemiruCheckboxRef} />} label="iemiruへ公開する" sx={{
                    '& .MuiFormControlLabel-label': {
                      marginLeft: "8px",
                      letterSpacing: "1px",
                    },
                    '& .MuiCheckbox-root': {
                      padding: 0,
                    }
                  }} />
                <div className="flex ml-4">
                  <span className="mr-2">見学マッチングサイト iemiruに当イベントを掲載し、新規集客を行います。※掲載料金無料</span>
                  <Image src="/imgs/icons/logo_iemiru.png" width={140} height={30} alt="iemiru" className="self-center" />
                </div>
              </div>
            </div>
            <div className="mt-2">
              <FormControlLabel
                value="限定公開"
                control={<Radio />}
                label="限定公開"
                sx={{
                  marginRight: "5px",
                  '& .MuiSvgIcon-root': {
                    width: "18px",
                    height: "18px",
                  }
                }}
              />
              <RemoveRedEyeIcon sx={{
                color: "#737373",
                fontSize: "18px",
                margin: "4px 0",
              }} />
              <p className=" text-sm pl-5 leading-6 mt-1">
                URLを知っているお客様のみが閲覧できます。イベントURLをメールで送信したり、DMにQRコードを貼り付けて予約ページとして利用したりすることができます。
              </p>
            </div>
            <div className="mt-2">
              <FormControlLabel
                value="非公開"
                control={<Radio />}
                label="非公開"
                sx={{
                  marginRight: "5px",
                  '& .MuiSvgIcon-root': {
                    width: "18px",
                    height: "18px",
                  }
                }}
              />
              <VisibilityOffRoundedIcon sx={{
                color: "#737373",
                fontSize: "18px",
                margin: "4px 0",
              }} />
            </div>
          </RadioGroup>
        </DialogContent>
        <DialogActions sx={{
          marginTop: "8px",
          padding: "12px",
          backgroundColor: "#eee",
        }}>
          <Button
            autoFocus
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "#bcbcbc",
              padding: "5px 20px",
              borderRadius: "1px",
              '&:hover': {
                backgroundColor: "#bcbcbc",
              }
            }}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            href={isBack ? `/events/${id}` : ''}
            sx={{
              borderRadius: "1px",
              padding: "5px 20px",
            }}
          >
            保存する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CampaignPublicBtn;
