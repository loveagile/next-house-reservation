"use client";

import InputField from "@/components/molecules/InputField/InputField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";
import MultilineField from "@/components/molecules/MultilineField/MultilineField";
import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { EventAtom } from "@/lib/recoil/EventAtom";
import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import RequiredLabel from "@/components/atoms/RequiredLabel";
import { getFormatDate, getNearestFutureDate } from "@/utils/convert";
import Loading from "@/components/molecules/Loading/loading";

import "./ReservationNewPage.css";

interface IReservationForm {
  date: string;
  time: string;
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

export interface INearestDateTime {
  candidateDate: string;
  candidateTimes: string[];
}

export default function ReservationNewPage() {
  const router = useRouter();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nearestDate, setNearestDate] = useState<INearestDateTime>({
    candidateDate: "",
    candidateTimes: []
  })

  useEffect(() => {
    const fetchEventDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      const data = res.data[0];
      if (res.status === 200) {
        setNearestDate(getNearestFutureDate(JSON.parse(data.eventDate)));
      }
      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  const schema = yup.object().shape({
    date: yup.string().required("入力してください。"),
    time: yup.string().required("入力してください。"),
    lastName: yup.string().required("入力してください。"),
    firstName: yup.string().required("入力してください。"),
    seiName: yup.string().required("入力してください。")
      .matches(hiraganaRegex, 'ひらがなで入力してください'),
    meiName: yup.string().required("入力してください。")
      .matches(hiraganaRegex, 'ひらがなで入力してください'),
    phone: yup.string().required("入力してください。")
      .test('is-not-empty', '電話番号を正しく入力してください', (value) => {
        value = value.replaceAll('-', '')
        return /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/g.test(value)
      }),
    email: yup.string().email("メールアドレスを正しく入力してください")
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
    const { date, time, lastName, firstName, seiName, meiName, zipCode, prefecture, city, street, building, phone, email, note, memo } = data;

    const res = await axios.post('/api/customers/create', {
      status: "予約",
      lastName, firstName, seiName, meiName,
      zipCode, prefecture, city, street, building,
      email, note, memo
    });

    const { lastCustomerId } = res.data;

    await axios.post('/api/reservations/create', {
      customerId: lastCustomerId,
      eventId: id,
      reservationAt: `${date} ${time.padStart(5, "0")}:00`,
      status: "active",
    });

    router.push("/reservations/list");
  };

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-hover-green border-l-[6px] mb-2 text-[20px] p-0 pl-2 font-bold text-[#555]">
            予約入力
          </h1>
          <p className="text-sm">
            予約情報の登録ができます
          </p>
        </div>
        <div className="bg-white w-full p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Reservation Date */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="date">日付</InputLabel>
                <RequiredLabel />
              </div>
              <div className="w-full">
                <InputField id="date" control={control} className="max-w-full w-full" value={nearestDate.candidateDate} disabled />
              </div>
            </div>

            {/* Reservation Time */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="time">時刻</InputLabel>
              </div>
              <div className="w-full">
                <SelectBox
                  id="time"
                  control={control}
                  names={nearestDate.candidateTimes}
                  className="max-w-[150px]"
                />
              </div>
            </div>

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
                  <p className="text-[14px] mt-3 text-m-red">
                    {errors.lastName?.message}
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
                  <p className="text-[14px] mt-3 text-m-red">
                    {errors.seiName?.message}
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
                  <p className="text-[14px] mt-3 text-m-red">
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
