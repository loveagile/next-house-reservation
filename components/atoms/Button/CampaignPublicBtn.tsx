"use client";

import axios from "axios";
import { useState, useRef } from "react";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Radio from '@mui/material/Radio';
import { FormControlLabel, Checkbox } from '@mui/material';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
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
      field_names: ["status", "statusBit"],
      field_values: [selectedRadio, 2 * Number(embedChecked) + Number(iemiruChecked)],
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
        <Button onClick={() => setOpen(false)} sx={{
          position: "absolute",
          right: "4px",
          top: "4px",
          minWidth: 0,
          color: "#95979c",
        }}>
          <IoIosClose className="text-3xl" />
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
                <BsFillEyeFill className="mx-1 text-xl text-[#2aac6d]" />
              </div>
              <div className="flex flex-col p-6 gap-1">
                <FormControlLabel control={<Checkbox defaultChecked={campaignStatus.isEmbed}
                  inputRef={embedCheckboxRef} />} label="埋込先HPへ公開する" sx={{
                    '& .MuiFormControlLabel-label': {
                      marginLeft: "8px",
                      letterSpacing: "1px",
                      fontSize: "14px",
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
                      fontSize: "14px",
                    },
                    '& .MuiCheckbox-root': {
                      padding: 0,
                    }
                  }} />
                <div className="flex ml-4">
                  <span className="mr-2 text-sm">見学マッチングサイト iemiruに当イベントを掲載し、新規集客を行います。※掲載料金無料</span>
                  <Image src="/imgs/icons/logo_iemiru.png" width={140} height={30} alt="iemiru" className="self-center" />
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center">
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
                <BsFillEyeFill className="mx-1 text-xl text-[#737373]" />
              </div>
              <p className=" text-sm pl-5 leading-6 mt-1">
                URLを知っているお客様のみが閲覧できます。イベントURLをメールで送信したり、DMにQRコードを貼り付けて予約ページとして利用したりすることができます。
              </p>
            </div>
            <div className="flex items-center mt-2">
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
              <BsFillEyeSlashFill className="mx-1 text-xl text-[#737373]" />
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
            href={isBack ? `/campaigns/${id}` : ''}
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
