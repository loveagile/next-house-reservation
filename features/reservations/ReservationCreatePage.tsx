"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, InputLabel } from "@mui/material";
import Loading from "@/components/molecules/loading";
import InputField from "@/components/molecules/Input/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import MultilineField from "@/components/molecules/Input/MultilineField";
import ReservationDate from "@/components/molecules/Reservation/ReservationDate";
import ReservationTime, { IReservationTimeProps } from "@/components/molecules/Reservation/ReservationTime";

import { CandidateEventDateTimeAtom, ReserveDateAtom, ReserveTimeAtom } from "@/lib/recoil/EventReserveDateAtom";
import { getCandidateReserveDateTimes, eventHoldingPeriod, getTimeStr, getCandidateReserveTimes } from "@/utils/convert";
import { IEvent, initialEvent, IEventDateTime, IReserveDateTime } from "@/utils/types";

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

const hiraganaRegex = /^[\u3040-\u309Fー]+$/;

export default function ReservationCreatePage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [eventItem, setEventItem] = useState<IEvent>(initialEvent);
  const [candidateReserveDateTimes, setCandidateReserveDateTimes] = useRecoilState(CandidateEventDateTimeAtom);
  const [reserveDate, setReserveDate] = useRecoilState(ReserveDateAtom);
  const [reserveTime, setReserveTime] = useRecoilState(ReserveTimeAtom);

  useEffect(() => {
    const fetchEventDetail = async () => {
      setIsLoading(true);

      const res = await axios.post("/api/events/detail", { id, });
      if (res.status === 200) {
        const data = res.data[0];
        setEventItem(data);
        const candidates: IEventDateTime[] = getCandidateReserveDateTimes(JSON.parse(data.eventDate));
        setReserveDate({
          value: candidates[0]?.date || "",
          isOpen: false,
        });
        setReserveTime({
          startTime: getTimeStr(candidates[0]?.time[0]) || "",
          endTime: getTimeStr(candidates[0]?.time[1]) || "",
        });
        setCandidateReserveDateTimes(candidates);
      }
      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

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

    let customerId = -1;
    const customer = await axios.post("/api/customers/detail", {
      field_name: "phone",
      field_value: phone.replaceAll("-", ""),
    });

    if (customer.status === 200) {
      const customerData = customer.data;
      if (customerData.length > 0) {
        customerId = customerData[0].id;
      } else {
        const res = await axios.post('/api/customers/create', {
          status: "未設定", route: "予約",
          lastName, firstName, seiName, meiName,
          zipCode, prefecture, city, street, building,
          phone: phone.replaceAll("-", ""),
          email, note, memo,
          delivery: "未設定",
        });
        const { lastCustomerId } = res.data;
        customerId = lastCustomerId;
      }
    }

    await axios.post('/api/reservations/create', {
      customerId,
      eventId: id,
      reserveDate: reserveDate.value,
      startTime: reserveTime.startTime,
      endTime: reserveTime.endTime,
      status: "active",
      route: "手入力",
    });

    router.push("/reservations/list");
  };

  const { title, type, format, eventDate, images, mainIndex } = eventItem;
  const mainImg = images?.split(",").map((img) => img.trim())[mainIndex] || "/imgs/events/no_image.png";

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] mb-2 text-xl p-0 pl-2 font-bold ">
            予約入力
          </h1>
          <p className="text-sm">予約情報の登録ができます</p>
        </div>
        <div className="bg-white w-full p-5">
          {/* Reservation Event Info */}
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
                  {type}
                </span>
                <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
                  {format}
                </span>
              </div>
              <p className="mt-2 text-[15px]">
                <Link href={`/events/${id}`} className="text-m-blue underline">{title}</Link>
              </p>
              <p className="text-sm text-[#ff0000] mt-auto">
                {eventHoldingPeriod(JSON.parse(eventDate))}
              </p>
            </div>
          </div>

          {/* Reservation Form Part */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {candidateReserveDateTimes.length > 0 && (
              <>
                {/* Reservation Date */}
                <div className="flex items-start mt-5 relative">
                  <div className="flex min-w-[230px] justify-end pr-5">
                    <InputLabel htmlFor="date">日付</InputLabel>
                    <RequiredLabel />
                  </div>
                  <div className="w-full">
                    <ReservationDate />
                  </div>
                </div>

                {/* Reservation Time */}
                <div className="flex items-start mt-5">
                  <div className="flex min-w-[230px] justify-end pr-5">
                    <InputLabel htmlFor="time">時刻</InputLabel>
                  </div>
                  <div className="w-full">
                    <ReservationTime />
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
                <Button type="submit" variant="contained" sx={{
                  padding: "3px 30px",
                  fontSize: "20px",
                  borderRadius: "1px",
                }}
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
