"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

import Loading from "@/components/molecules/loading";
import InputField from "@/components/molecules/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import MultilineField from "@/components/molecules/MultilineField";
import ReservationDate from "@/components/molecules/ReservationDate/ReservationDate";
import ReservationTime from "@/components/molecules/ReservationTime/ReservationTime";

import { IEventDateTime } from "@/utils/types";
import { IReservationTimeProps } from "@/components/molecules/ReservationTime/ReservationTime";
import { formatDateToJapaneseString, getFormatDate, getTimeStr } from "@/utils/convert";
import { EventDateAtom, SelectYearMonthAtom, CandidateReserveDateAtom, CurrentReserveDateAtom } from "@/lib/recoil/EventDateAtom";

import "./ReservationNewPage.css";

interface IReservationForm {
  lastName: string;
  firstName: string;
  seiName: string;
  meiName: string;
  zipCode?: string;
  prefecture?: string;
  city?: string;
  street?: string;
  building?: string;
  phone: string;
  email?: string;
  note?: string;
  memo?: string;
}

interface IEventItem {
  eventId: number;
  title: string;
  type: string;
  format: string;
  images: string;
  mainIndex: number;
  eventDate: string;
}

const hiraganaRegex = /^[\u3040-\u309Fー]+$/;

export default function ReservationNewPage() {
  const router = useRouter();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eventDates, setEventDates] = useRecoilState(EventDateAtom);
  const [candidateReserveDates, setCandidateReserveDates] = useRecoilState(CandidateReserveDateAtom);
  const currentDate = useRecoilValue(CurrentReserveDateAtom);
  const [currentTime, setCurrentTime] = useState<IReservationTimeProps>({
    startTime: "",
    endTime: "",
  });
  const [__, setSelectYearMonth] = useRecoilState(SelectYearMonthAtom);

  useEffect(() => {
    const fetchEventDetail = async () => {
      setIsLoading(true);

      const currentDate: Date = new Date();
      setSelectYearMonth({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      });

      const res = await axios.post("/api/events/detail", { id });
      const data = res.data[0];
      if (res.status === 200) {
        setEventItem({
          eventId: data.id,
          title: data.title,
          type: data.type,
          format: data.format,
          images: data.images,
          mainIndex: data.mainIndex,
          eventDate: data.eventDate,
        });
        setEventDates(JSON.parse(res.data[0].eventDate));
      }
      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let candidates: IEventDateTime[] = [];
    for (let i = 0; i < eventDates.length; i++) {
      const currentEventDate: IEventDateTime = eventDates[i];
      const { date, time } = currentEventDate;
      for (let j = 0; j < time.length; j += 2) {
        if (getFormatDate(date, getTimeStr(time[j])) >= new Date()) {
          candidates.push({
            date,
            time: time.slice(j)
          });
          break;
        }
      }
    }
    if (candidates.length > 0) {
      const { date, time } = candidates[0];
      const [year, month, day] = date.split("-");
      setSelectYearMonth({
        year: Number(year),
        month: Number(month),
      })
    }
    setCandidateReserveDates(candidates);
    setIsLoading(false);
  }, [eventDates])

  useEffect(() => {
    setIsLoading(true);
    if (candidateReserveDates.length > 0 && candidateReserveDates[0].time.length > 0)
      setCurrentTime({
        startTime: getTimeStr(candidateReserveDates[0].time[0]),
        endTime: getTimeStr(candidateReserveDates[0].time[1]),
      })
    setIsLoading(false);
  }, [candidateReserveDates])

  const [eventItem, setEventItem] = useState<IEventItem>({
    eventId: 1,
    title: "",
    type: "",
    format: "",
    images: "",
    mainIndex: 0,
    eventDate: "",
  });

  const mainImg = eventItem.images ?
    eventItem.images.split(",").map((img) => img.trim())[eventItem.mainIndex] : "/imgs/events/no_image.png";

  const schema = yup.object().shape({
    lastName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください"),
    firstName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください"),
    seiName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください")
      .matches(hiraganaRegex, 'ひらがなで入力してください'),
    meiName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください")
      .matches(hiraganaRegex, 'ひらがなで入力してください'),
    phone: yup.string().required("入力してください。")
      .test('is-not-empty', '電話番号を正しく入力してください', (value) => {
        value = value.replaceAll('-', '')
        return /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/g.test(value)
      }),
    email: yup.string().email("メールアドレスを正しく入力してください")
      .max(80, "80字以内で入力してください"),
  });

  const {
    control,
    handleSubmit,
    watch, setValue,
    formState: { errors },
  } = useForm<IReservationForm>({
    resolver: yupResolver(schema),
  });

  const zipCode = watch("zipCode");

  useEffect(() => {
    const getAddress = async () => {
      await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            const { address1, address2, address3 } = data.results[0]

            setValue("prefecture", address1);
            setValue("city", address2);
            setValue("street", address3);
          } else {
            console.log("Address not found")
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
    };

    getAddress();
  }, [zipCode])


  const onSubmit = async (data: IReservationForm) => {
    const {
      lastName, firstName, seiName, meiName,
      zipCode, prefecture, city, street, building,
      phone, email, note, memo
    } = data;

    const res = await axios.post('/api/customers/create', {
      status: "未設定", route: "予約",
      lastName, firstName, seiName, meiName,
      zipCode, prefecture, city, street, building,
      phone, email, note, memo,
      delivery: "未設定",
    });

    const { lastCustomerId } = res.data;

    await axios.post('/api/reservations/create', {
      customerId: lastCustomerId,
      eventId: id,
      reserveDate: currentDate.value,
      startTime: currentTime.startTime,
      endTime: currentTime.endTime,
      status: "active",
    });

    router.push("/reservations/list");
  };

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] mb-2 text-xl p-0 pl-2 font-bold ">
            予約入力
          </h1>
          <p className="text-sm">
            予約情報の登録ができます
          </p>
        </div>
        <div className="bg-white w-full p-5">
          <div className="flex p-3 border-[1px] border-[#ddd]">
            <Image
              src={mainImg}
              width={160}
              height={120}
              className="w-[160px] h-[120px]"
              alt="イベント画像"
            />
            <div className="flex flex-col ml-3">
              <div>
                <span className="text-[10px] text-white bg-black px-2 py-[2px]">
                  {eventItem.type}
                </span>
                <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
                  {eventItem.format}
                </span>
              </div>
              <p className="mt-2 text-[15px]">
                <Link href={`/events/${eventItem.eventId}`} className="text-m-blue underline">{eventItem.title}</Link>
              </p>
              {eventDates && eventDates.length > 0 && (
                <p className="text-sm text-[#ff0000] mt-auto">
                  {formatDateToJapaneseString(new Date(eventDates[0].date))}
                  {eventDates.length > 1 && (
                    `〜${formatDateToJapaneseString(new Date(eventDates[eventDates.length - 1].date))}`
                  )}
                </p>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {candidateReserveDates.length > 0 && (
              <>
                {/* Reservation Date */}
                <div className="flex items-start mt-5 relative">
                  <div className="flex min-w-[230px] justify-end pr-5">
                    <InputLabel htmlFor="date">日付</InputLabel>
                    <RequiredLabel />
                  </div>
                  <div className="w-full">
                    <ReservationDate id="date" className="max-w-full w-full" value={candidateReserveDates[0].date} />
                  </div>
                </div>

                {/* Reservation Time */}
                <div className="flex items-start mt-5">
                  <div className="flex min-w-[230px] justify-end pr-5">
                    <InputLabel htmlFor="time">時刻</InputLabel>
                  </div>
                  <div className="w-full">
                    <ReservationTime id="time" currentTime={currentTime} setCurrentTime={setCurrentTime} />
                  </div>
                </div>
              </>
            )}

            {/* Client Name */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel>お客様名(姓/名)</InputLabel>
                <RequiredLabel />
              </div>
              <div className="w-full">
                <div className="flex gap-x-4">
                  <InputField id="lastName" control={control} className="w-1/4" placeholder="例）見学" />
                  <InputField id="firstName" control={control} className="w-1/4" placeholder="例）太郎" />
                </div>
                {(errors.lastName || errors.firstName) && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.lastName && errors.lastName?.message}
                    {!errors.lastName && errors.firstName?.message}
                  </p>
                )}
                <p className="text-sm mt-2">
                  空白は自動的に除去されます。
                </p>
              </div>
            </div>

            {/* Furigana Client Name */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel>ふりがな(せい/めい)</InputLabel>
                <RequiredLabel />
              </div>
              <div className="w-full">
                <div className="flex gap-x-4">
                  <InputField id="seiName" control={control} className="w-1/4" placeholder="例）けんがく" />
                  <InputField id="meiName" control={control} className="w-1/4" placeholder="例）たろう" />
                </div>
                {(errors.seiName || errors.meiName) && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.seiName && errors.seiName.message}
                    {!errors.seiName && errors.meiName?.message}
                  </p>
                )}
                <p className="text-sm mt-2">
                  空白は自動的に除去されます。
                </p>
              </div>
            </div>

            {/* Postal Code & City */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel>郵便番号/都道府県</InputLabel>
              </div>
              <div className="w-full">
                <div className="flex gap-x-4">
                  <InputField id="zipCode" control={control} className="w-1/4" placeholder="例）000-0000" />
                  <InputField id="prefecture" control={control} className="w-1/4" placeholder="例）鹿児島県" />
                </div>
                <p className="text-sm mt-2">
                  郵便番号を入力いただくと自動で住所が入力されます
                </p>
              </div>
            </div>

            {/* City */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="city">市区町村</InputLabel>
              </div>
              <div className="w-full">
                <div className="flex gap-x-4">
                  <InputField id="city" control={control} className="w-2/5" placeholder="例）姶良市加治木町" />
                </div>
                <p className="text-sm mt-2">
                  空白は自動的に除去されます。
                </p>
              </div>
            </div>

            {/* Street */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="street">番地</InputLabel>
              </div>
              <div className="w-full">
                <div className="flex gap-x-4">
                  <InputField id="street" control={control} className="w-2/5" placeholder="例）〇〇町1丁目23-45" />
                </div>
                <p className="text-sm mt-2">
                  空白は自動的に除去されます。全角英数字は自動的に半角に変換されます
                </p>
              </div>
            </div>

            {/* Building Name */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="building">建物名・部屋番号</InputLabel>
              </div>
              <div className="w-full">
                <div className="flex gap-x-4">
                  <InputField id="building" control={control} className="w-2/5" placeholder="例）〇〇マンション〇号室" />
                </div>
                <p className="text-sm mt-2">
                  空白は自動的に除去されます。全角英数字は自動的に半角に変換されます
                </p>
              </div>
            </div>

            {/* Contract Phone */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="phone">連絡先電話番号</InputLabel>
                <RequiredLabel />
              </div>

              <div className="w-full">
                <InputField id="phone" control={control} className="w-2/5" />
                {errors.phone && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.phone?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="email">メールアドレス</InputLabel>
              </div>
              <div className="w-full">
                <InputField id="email" control={control} className="w-2/5" />
              </div>
            </div>

            {/* Contract Info */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="note">
                  その他連絡事項など
                </InputLabel>
              </div>
              <div className="w-full">
                <MultilineField id="note" control={control} />
              </div>
            </div>

            {/* Memo */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="memo">
                  社内メモ
                </InputLabel>
              </div>
              <div className="w-full">
                <MultilineField id="memo" control={control} />
              </div>
            </div>

            {/* Register Button */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5"></div>
              <div className="w-full">
                <Button
                  type="submit"
                  className="register_btn"
                  variant="contained"
                >
                  登録する
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  )
}
