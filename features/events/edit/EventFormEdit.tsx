"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter, useParams } from "next/navigation";
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";

import { Checkbox, MenuItem, Button, InputLabel } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

import { IForm } from "@/utils/types";


export interface IEventFormProps {
  title: string;
  detail: string;
  type: string;
  choice: string;
  isNecessary: boolean;
}

const EventFormEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registerForms, setRegisterForms] = useState<IForm[]>([]);
  const [currentForms, setCurrentForms] = useState<IEventFormProps[]>([]);
  const [formError, setFormError] = useState<string>("");

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const mainID = cookies['user'].id;
  const subID = cookies['user'].subId;
  const userID = subID !== -1 ? subID : mainID;

  useEffect(() => {
    const fetchEventFormat = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200 && res.data[0].reserveForm) {
        setCurrentForms(JSON.parse(res.data[0].reserveForm));
      }
      const forms = await axios.post('/api/forms/get', { userID });
      if (forms.status === 200) {
        setRegisterForms(forms.data);
      }

      setIsLoading(false);
    };
    fetchEventFormat();
  }, [id, userID]);

  const onEventFormAdd = () => {
    if (registerForms.length === 0) {
      setFormError("登録されたフォームはありません");
      return;
    }
    const { formTitle, formDetail, formType, formChoice } = registerForms[0];
    setCurrentForms(prevState => [
      ...prevState, {
        title: formTitle,
        detail: formDetail,
        type: formType,
        choice: formChoice,
        isNecessary: false,
      }
    ])
  }

  const onEventFormRemove = (orderIndex: number) => {
    setCurrentForms([
      ...currentForms.slice(0, orderIndex),
      ...currentForms.slice(orderIndex + 1),
    ])
  }

  const handleFormSelectChange = (event: SelectChangeEvent, orderIndex: number) => {
    const selectedStr = event.target.value as string;
    const selectedForm = registerForms.filter(form => form.formTitle === selectedStr);
    setCurrentForms(prevState => [
      ...prevState.slice(0, orderIndex),
      {
        title: selectedStr,
        type: selectedForm[0].formType,
        detail: selectedForm[0].formDetail,
        choice: selectedForm[0].formChoice,
        isNecessary: prevState[orderIndex].isNecessary,
      },
      ...prevState.slice(orderIndex + 1),
    ])
  }

  const handleFormCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>, orderIndex: number) => {
    setCurrentForms(prevState => [
      ...prevState.slice(0, orderIndex),
      {
        ...prevState[orderIndex],
        isNecessary: event.target.checked,
      },
      ...prevState.slice(orderIndex + 1),
    ])
  }

  const handleUpArrowBtn = (orderIndex: number) => {
    if (orderIndex > 0) {
      setCurrentForms((prevForms) => {
        const swapForms = [...prevForms];
        [swapForms[orderIndex - 1], swapForms[orderIndex]] = [swapForms[orderIndex], swapForms[orderIndex - 1]];
        return swapForms;
      });
    }
  };

  const handleUpDownBtn = (orderIndex: number) => {
    if (orderIndex < currentForms.length - 1) {
      setCurrentForms((prevForms) => {
        const swapForms = [...prevForms];
        [swapForms[orderIndex], swapForms[orderIndex + 1]] = [swapForms[orderIndex + 1], swapForms[orderIndex]];
        return swapForms;
      });
    }
  }

  const onSubmit = async () => {
    const titles = new Set();
    for (const form of currentForms) {
      if (titles.has(form.title)) {
        setFormError('重複した値が存在します');
        return;
      }
      titles.add(form.title);
    }

    setFormError("");
    await axios.post("/api/events/update-json", {
      id,
      field_name: "reserveForm",
      field_value: currentForms,
    })

    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="px-10 py-8 w-full">
      <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
        アンケートフォーム編集
      </h1>
      <div className="bg-white items-start mt-5 p-5 w-full">
        {formError &&
          <p className="border-[1px] border-m-red p-3 mb-4 text-m-red rounded text-[15px]">
            <InfoRoundedIcon className="mr-1" />{formError}
          </p>}
        {currentForms.map((form, orderIndex) => (
          <div className="w-full flex border p-4 mb-4 rounded" key={orderIndex}>
            <div className="flex items-start w-[280px] justify-between pr-5 mt-1">
              <div className="flex gap-2">
                <Button onClick={() => handleUpArrowBtn(orderIndex)} variant="contained" sx={{
                  padding: "1px 15px",
                  borderRadius: "1px",
                  backgroundColor: "#bcbcbc",
                  minWidth: "auto",
                  transition: "all 0.5s ease-out",
                  '&:hover': {
                    backgroundColor: "#bcbcbc",
                    opacity: 0.9,
                  }
                }}>
                  <HiOutlineArrowNarrowUp className="text-white text-lg" />
                </Button>
                <Button onClick={() => handleUpDownBtn(orderIndex)} variant="contained" sx={{
                  padding: "4px 12px",
                  borderRadius: "1px",
                  backgroundColor: "#bcbcbc",
                  minWidth: "auto",
                  transition: "all 0.5s ease-out",
                  '&:hover': {
                    backgroundColor: "#bcbcbc",
                    opacity: 0.9,
                  }
                }}>
                  <HiOutlineArrowNarrowDown className="text-white text-lg" />
                </Button>
              </div>
              <InputLabel htmlFor="format">イベントの開催形式</InputLabel>
            </div>
            <div className="flex-1">
              <Select
                id="eventForm"
                value={form.title}
                onChange={(e) => handleFormSelectChange(e, orderIndex)}
                sx={{
                  '& .MuiSelect-select': {
                    padding: '5px 15px',
                    minWidth: '170px',
                  },
                }}
              >
                {registerForms.map((registerForm, index) => (
                  <MenuItem value={registerForm.formTitle} key={index}>{registerForm.formTitle}</MenuItem>
                ))}
              </Select>
              <div className="flex items-center">
                <Checkbox sx={{
                  padding: "10px 0",
                }}
                  onChange={(e) => handleFormCheckBoxChange(e, orderIndex)}
                  checked={form.isNecessary}
                />
                <span className="text-sm ml-2">必須</span>
              </div>
              <Button
                onClick={() => onEventFormRemove(orderIndex)}
                variant="contained"
                sx={{
                  fontSize: "13px",
                  padding: "1px 10px",
                  marginTop: "5px",
                  borderRadius: "1px",
                  backgroundColor: "#e73939",
                  transition: "all 0.5s ease-out",
                  '&:hover': {
                    backgroundColor: "#e73939",
                    opacity: 0.9,
                  }
                }}>
                フィールドを削除
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={onEventFormAdd} variant="contained" sx={{
          fontSize: "16px",
          padding: "3px 25px",
          borderRadius: "1px",
          backgroundColor: "#2296f3",
          transition: "all 0.5s ease-out",
          '&:hover': {
            backgroundColor: "#2296f3",
            opacity: 0.9,
          }
        }}>
          フィールドを追加
        </Button>
        <div className="flex">
          <div className="w-[250px]"></div>
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{
              width: "170px",
              fontSize: "20px",
              padding: "3px 25px",
              marginTop: "20px",
              borderRadius: "1px",
            }}
          >
            更新する
          </Button>
        </div>
      </div>
      <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
    </div>
  );
};

export default EventFormEditPage;

