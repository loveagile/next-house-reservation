"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Select, { MultiValue } from 'react-select';
import { useParams, useRouter } from "next/navigation";

import Button from "@mui/material/Button";

import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

interface IOptionProps {
  value: string;
  label: string;
}

const fixedOptions = [
  { value: "20代向け", label: "20代向け" },
  { value: "30代向け", label: "30代向け" },
  { value: "40代向け", label: "40代向け" },
  { value: "50代以上向け", label: "50代以上向け" },
  { value: "夫婦+子供", label: "夫婦+子供" },
  { value: "二世帯", label: "二世帯" },
  { value: "三世帯", label: "三世帯" },
  { value: "夫婦のみ", label: "夫婦のみ" },
  { value: "DIY", label: "DIY" },
  { value: "子育て", label: "子育て" },
  { value: "家事動線", label: "家事動線" },
  { value: "収納", label: "収納" },
  { value: "駐車場あり", label: "駐車場あり" }
];

const EventTagEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allOptions, setAllOptions] = useState<IOptionProps[]>(fixedOptions);
  const [defaultOptions, setDefaultOptions] = useState<IOptionProps[]>([]);
  const [tag, setTag] = useState<string[]>([]);

  useEffect(() => {
    const fetchEventTag = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        const tagStr = res.data[0].tag as string;
        if (tagStr) {
          const tagArray = tagStr.split(",").map(tag => tag.trim());
          const tagsOption = tagArray.map(tag => (
            {
              value: tag,
              label: tag,
            }
          ))
          setDefaultOptions(tagsOption);
        }
      }
      setIsLoading(false);
    };
    fetchEventTag();
  }, []);


  const updateBtnClicked = async () => {
    await axios.post("/api/events/update", {
      id,
      field_names: ["tag"],
      field_values: [tag.join(", ")],
    })
    router.push(`/events/${id}`);
  }

  const onChange = (selected: MultiValue<IOptionProps>) => {
    const selectedValues = selected.map((item) => item.value);
    setTag(selectedValues);
  }

  const onInputChange = (value: string) => {
    if (value) {
      setAllOptions([{
        value: value, label: value
      }, ...fixedOptions])
    } else {
      setAllOptions(fixedOptions);
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="px-10 py-8 w-full">
      <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
        イベントタグ
      </h1>
      <div className="flex flex-col bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm leading-6 mb-4">
          このイベントの特徴を表す言葉や単語などを自由にご入力ください。
          <br></br>
          入力例）キッズルームあり、QUOカードをプレゼント、駐車スペースあり
        </p>
        <div className="flex flex-col w-full">
          <Select
            defaultValue={defaultOptions}
            isMulti
            name="colors"
            options={allOptions}
            onInputChange={onInputChange}
            onChange={onChange}
            placeholder=""
          />
          <Button variant="contained" onClick={updateBtnClicked} sx={{
            maxWidth: "170px",
            fontSize: "20px",
            padding: "3px 25px",
            marginTop: "20px",
            borderRadius: "1px",
          }}>
            更新する
          </Button>
        </div>
      </div>
      <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
    </div>
  );
};

export default EventTagEditPage;
