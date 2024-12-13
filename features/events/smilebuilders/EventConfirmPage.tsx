"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button, InputLabel } from "@mui/material";

import { IoCheckmarkSharp } from "react-icons/io5";

import CheckBox from "@/components/molecules/Input/CheckBox";
import InputField from "@/components/molecules/Input/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import MultilineField from "@/components/molecules/Input/MultilineField";
import MoreFormFC from "@/components/molecules/MoreFormFC";

import Loading from "@/components/molecules/loading";
import { IEvent, initialEvent } from "@/utils/types";
import { formatDateToJapaneseString } from "@/utils/convert";

import { IEventFormProps } from "../edit/EventFormEdit";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

interface IEventReserveForm {
  reserveDate: string;
  startTime: string;
  endTime: string;
}

interface ICustomerForm {
  lastName: string;
  firstName: string;
  seiName: string;
  meiName: string;
  zipCode: string;
  prefecture: string;
  city: string;
  street: string;
  building?: string;
  phone: string;
  email: string;
  note?: string;
}

const initialCustomer: ICustomerForm = {
  lastName: "",
  firstName: "",
  seiName: "",
  meiName: "",
  zipCode: "",
  prefecture: "",
  city: "",
  street: "",
  building: "",
  phone: "",
  email: "",
  note: "",
}

interface IUser {
  name: string;
  email: string;
  eventURL: string;
  phone: string;
}

const initialUser: IUser = {
  name: "スマイルビルダーズ",
  email: "info@smile-builders-hiraya.com",
  eventURL: "smilebuilders",
  phone: "0995-55-8900",
}

const EventConfirmPage: React.FC = () => {
  const { id, event_url } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<IEvent>(initialEvent);
  const [reserveDateTime, setReserveDateTime] = useState<IEventReserveForm>({
    reserveDate: new Date().toString(),
    startTime: "00:00",
    endTime: "23:30",
  });
  const [customer, setCustomer] = useState<ICustomerForm>(initialCustomer);
  const [isReceiveInfo, setIsReceiveInfo] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(initialUser);
  const [formValues, setFormValues] = useState<string[]>([]);

  const { control } = useForm<ICustomerForm>();

  useEffect(() => {
    const eventReserveData = localStorage.getItem("eventReserveData");
    const customerData = localStorage.getItem("customerData");
    if (eventReserveData && customerData) {
      const customerConvData = JSON.parse(customerData);
      setReserveDateTime(JSON.parse(eventReserveData));
      setFormValues(customerConvData.formValues);
      setCustomer(customerConvData);
      setIsReceiveInfo(customerConvData.isReceiveInfo);
    } else {
      router.push(`/${event_url}/events/${id}/`);
    }

    const fetchEventDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        const data = res.data[0];
        setEvent(data);

        const userID = data.userID;
        const { data: user } = await axios.post("/api/auth/detail", {
          id: userID,
        });
        if (user.eventURL !== event_url) {
          router.push("/404");
        }
        setUser(user);
      } else {
        router.push("/404");
      }

      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  const {
    userID, title, type,
    prefecture, address1, address2,
    images, mainIndex, reserveForm,
  } = event;

  const mainImg = images?.split(",").map((img) => img.trim())[mainIndex] || "/imgs/events/no_image.png";
  const webAddress = (prefecture || "") + (address1 || "") + (address2 || "");
  const moreForms = reserveForm ? JSON.parse(reserveForm) as IEventFormProps[] : [];

  const onMoreFormChange = (index: number, updatedValue: string) => { }

  const handleSubmit = async () => {
    let customerId = -1;

    const { lastName, firstName, seiName, meiName,
      zipCode, prefecture, city, street, building,
      phone, email, note,
    } = customer;

    const customerData = await axios.post("/api/customers/detail", {
      field_name: "email",
      field_value: email,
    });

    if (customerData.status === 200) {
      const data = customerData.data;
      if (data.length > 0) {
        customerId = data[0].id;
      } else {
        const res = await axios.post('/api/customers/create', {
          groupID: userID,
          status: "未設定", route: "予約",
          lastName, firstName, seiName, meiName,
          zipCode, prefecture, city, street, building,
          phone: phone.replaceAll("-", ""),
          email, note,
          delivery: "未設定",
        });
        const { lastCustomerId } = res.data;
        customerId = lastCustomerId;
      }
    }

    const reservation = await axios.post('/api/reservations/create', {
      groupID: userID,
      customerId,
      eventId: id,
      reserveDate: reserveDateTime.reserveDate,
      startTime: reserveDateTime.startTime,
      endTime: reserveDateTime.endTime,
      status: "active",
      route: "KC",
    });

    const { lastReservationId } = reservation.data;

    // From System To User
    const userContent = `
    ${lastName}${firstName}様

    ご予約いただきありがとうございます。

    「${title}」への予約を受け付けましたので、お知らせいたします。

    ────────────────────────────────
    ◆ 予約受付詳細 ◆
    ────────────────────────────────
    ■【お名前】
    ${lastName}${firstName}様

    ■【予約イベント】
    ${title}

    ■【予約希望日】
    ${formatDateToJapaneseString(new Date(reserveDateTime.reserveDate))} ${reserveDateTime.startTime}

    ■【その他連絡事項】
    ${note}

    ■【イベント開催場所】
    ${webAddress}


    ＜当日チェックしてほしいポイント＞
    ▼ イベント内容はコチラからご確認ください ▼
    ${SITE_URL}/${event_url}/events/${id}
    `;

    await axios.post("/api/sendEmail", {
      to: [{ email, }, { email: "info@wazeka.co.jp" }],
      subject: "【スマイルビルダーズ】イベントご予約の件",
      text: userContent,
    });

    // From System To Company
    const comContent = `
    ${user.name}様

    ${lastName}${firstName}様から貴社のイベント情報にイベント予約がありましたのでお知らせ致します。

    ■【イベント種別】
    ${type}

    ■【イベントタイトル】
    ${title}

    ■【予約日】
    ${formatDateToJapaneseString(new Date(reserveDateTime.reserveDate))} ${reserveDateTime.startTime}

    予約者の氏名、連絡先等の詳細につきましては、下記のURLからご確認ください。
    ${SITE_URL}/reservations/${lastReservationId}


    ※本メールアドレスは送信専用となっております。
    ──────────────────────────────────────────────────────
    平屋だけの姶良総合住宅展示場スマイルビルダーズ
    住所：鹿児島県姶良市加治木町木田2511-1
    営業時間：10:00〜18:00
    定休日：水曜日
    FAX：0995-55-8818
    MAIL：info@smile-builders-hiraya.com
    TEL：0995-55-8900
    ──────────────────────────────────────────────────────
    `;

    await axios.post("/api/sendEmail", {
      to: [{ email: user.email }, { email: "info@wazeka.co.jp" }],
      subject: "【スマイルビルダーズ】イベント予約がありました",
      text: comContent,
    });

    router.push(`/${event_url}/events/${id}/complete`);
  }

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <div className="bg-[#F3F4F6] w-full min-h-screen">
        <div className="flex flex-col w-full max-w-[640px] mx-auto my-8">
          {/* Event Information */}
          <div>
            <div className="w-full">
              <p className="bg-[#D1D5DB] text-center text-black p-1 text-sm">
                予約完了まであと少し！
              </p>
              <div className="flex items-center justify-center my-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold">
                  1
                </div>
                <div className="h-1 w-16 bg-[#3B82F6]"></div>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold">
                  2
                </div>
                <div className="h-1 w-16 bg-[#3B82F6]"></div>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold">
                  3
                </div>
                <div className="h-1 w-16 bg-[#c8c8c8]"></div>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-[#c8c8c8] border-[2px] text-black font-bold">
                  <IoCheckmarkSharp />
                </div>
              </div>
            </div>

            <div className="relative rounded-xl">
              <Image src={mainImg} className="rounded-xl" width={640} height={360} alt="イベント画像" />
            </div>

            <div className="bg-[#F9FAFB] p-6 my-8 rounded-xl">
              <h2 className="text-lg text-black font-bold">予約内容</h2>
              <p className="border-b-[1px] border-[#E5E7EB] py-3">
                <span className="inline-block w-[100px]">イベント名</span>{title}
              </p>
              <p className="border-b-[1px] border-[#E5E7EB] py-3">
                <span className="inline-block w-[100px]">開催場所</span>{webAddress}
              </p>
              <p className="border-b-[1px] border-[#E5E7EB] py-3">
                <span className="inline-block w-[100px]">予約日</span>
                {formatDateToJapaneseString(new Date(reserveDateTime.reserveDate))}
              </p>
              <p className="pt-3">
                <span className="inline-block w-[100px]">予約時間</span>
                {reserveDateTime?.startTime}
              </p>
            </div>

            <p className="p-2 border-[1px] border-[#EF4444] text-[#EF4444] rounded-md text-sm text-center mx-auto my-5 w-full leading-6">
              まだ予約は完了していません。<br />
              内容をご確認の上、「予約を確定する」ボタンを押してください。
            </p>
          </div>

          <div>
            {/* Client Name */}
            <div className="flex w-full gap-x-4 mt-4">
              <div>
                <div className="flex mb-2">
                  <InputLabel>姓</InputLabel>
                </div>
                <InputField id="lastName" control={control} value={customer.lastName} disabled />
              </div>
              <div>
                <div className="flex mb-2">
                  <InputLabel>名</InputLabel>
                </div>
                <InputField id="firstName" control={control} value={customer.firstName} disabled />
              </div>
            </div>

            {/* Furigana Client Name */}
            <div className="flex w-full gap-x-4 mt-8">
              <div>
                <div className="flex mb-2">
                  <InputLabel>せい</InputLabel>
                </div>
                <InputField id="seiName" control={control} value={customer.seiName} disabled />
              </div>
              <div>
                <div className="flex mb-2">
                  <InputLabel>めい</InputLabel>
                </div>
                <InputField id="meiName" control={control} value={customer.meiName} disabled />
              </div>
            </div>

            {/* Contract Phone */}
            <div className="w-full mt-8">
              <div className="flex mb-2">
                <InputLabel>電話番号（ハイフンなし）</InputLabel>
              </div>

              <div className="w-full">
                <InputField id="phone" control={control} className="w-full" value={customer.phone} disabled />
              </div>
            </div>

            {/* Email Address */}
            <div className="w-full mt-8">
              <div className="flex mb-2">
                <InputLabel>メールアドレス</InputLabel>
                <RequiredLabel />
              </div>

              <div className="w-full">
                <InputField id="email" control={control} className="w-full" value={customer.email} disabled />
              </div>

              <p className="text-sm mt-3">
                GmailやYahoo・iCloudメールなどの「html形式メールが受信可能な」メールアドレスを推奨しています。<br />
                ※携帯キャリアメールの場合は、正しくご確認できない場合がございますので、ご了承ください。
              </p>
            </div>

            {/* Postal Code */}
            <div className="w-full mt-8">
              <div className="flex mb-2">
                <InputLabel>郵便番号</InputLabel>
              </div>

              <div className="w-full">
                <InputField id="zipCode" control={control} className="w-1/2" value={customer.zipCode} disabled />
              </div>

              <p className="text-sm mt-3">
                郵便番号を入力いただくと自動で住所が入力されます
              </p>
            </div>

            {/* Prefecture & City */}
            <div className="flex w-full gap-x-2 mt-8">
              <div className="w-1/2">
                <div className="flex mb-2">
                  <InputLabel>都道府県</InputLabel>
                </div>
                <InputField id="prefecture" control={control} value={customer.prefecture} disabled />
              </div>
              <div className="w-full">
                <div className="flex mb-2">
                  <InputLabel>市区町村</InputLabel>
                </div>
                <InputField id="city" control={control} className="w-full" value={customer.city} disabled />
              </div>
            </div>

            {/* Street */}
            <div className="w-full mt-8">
              <div className="flex mb-2">
                <InputLabel>番地</InputLabel>
              </div>

              <div className="w-full">
                <InputField id="street" control={control} className="w-full" value={customer.street} disabled />
              </div>
            </div>

            {/* Building Name */}
            <div className="w-full mt-8">
              <div className="flex mb-2">
                <InputLabel>建物名・部屋番号</InputLabel>
              </div>

              <div className="w-full">
                <InputField id="building" control={control} className="w-full" value={customer.building} disabled />
              </div>
            </div>

            {/* More Form Items */}
            {moreForms.map((form, index) => (
              <MoreFormFC key={index} formData={form} value={formValues[index]} index={index}
                onFormChange={onMoreFormChange} disabled />
            ))}


            {/* Contract Info */}
            <div className="w-full mt-8">
              <div className="flex mb-2">
                <InputLabel>質問・ご連絡事項</InputLabel>
              </div>

              <div className="w-full">
                <MultilineField id="note" control={control} className="w-full" value={customer.note} disabled />
              </div>
            </div>

            <div className="w-full mt-6">
              <CheckBox
                checked={isReceiveInfo}
                setChecked={setIsReceiveInfo}
                className="flex items-center ml-auto"
                text="住宅会社からの情報提供を希望しない"
                disabled
              />
            </div>

            {/* Register Button */}
            <div className="w-full mt-5">
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  width: "100%",
                  maxWidth: "640px",
                  fontWeight: "5500",
                  backgroundColor: "#EF4444",
                  color: "white",
                  fontSize: "18px",
                  padding: "8px",
                  '&:hover': {
                    backgroundColor: "#EF4444",
                    opacity: 0.9,
                    transition: "all 0.3s ease-out"
                  }
                }}
              >
                予約を確定する
              </Button>
            </div>

            {/* Backward Button */}
            <div className="w-full mt-5">
              <Button
                onClick={() => router.push(`/${event_url}/events/${id}/reserve`)}
                variant="contained"
                sx={{
                  width: "100%",
                  maxWidth: "640px",
                  fontWeight: "500",
                  backgroundColor: "#4B5563",
                  color: "white",
                  fontSize: "18px",
                  padding: "4px 8px",
                  '&:hover': {
                    backgroundColor: "#4B5563",
                    opacity: 0.9,
                    transition: "all 0.3s ease-out"
                  }
                }}
              >
                <span className="ml-1">入力内容を修正する</span>
              </Button>
            </div>
          </div>

          <footer className="bg-[#2563EB] rounded-b-xl mt-4">
            <div className="flex items-center justify-center p-10 w-full max-w-[760px] text-white text-sm m-auto">
              <div className="leading-5">
                <Link href="https://smile-builders-hiraya.com/" className="text-xl font-bold block mb-3">
                  スマイルビルダーズ‐姶良総合住宅展示場-
                </Link>
                <p className="text-center">〒899-5432</p>
                <p className="text-center">鹿児島県姶良市加治木町木田2511-1</p>
              </div>
            </div>
          </footer>
        </div >
      </div >
    )
  );
};

export default EventConfirmPage;
