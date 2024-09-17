"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, InputLabel } from "@mui/material";

import Loading from "@/components/molecules/loading";
import SelectBox from "@/components/molecules/Input/SelectBox";
import InputField from "@/components/molecules/Input/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import MultilineField from "@/components/molecules/Input/MultilineField";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

import { ICustomer } from "@/utils/types";
import { customerStatus } from "@/utils/constants";

interface ICustomerForm {
  customerStatus: string;
  lastName: string;
  firstName: string;
  seiName: string;
  meiName: string;
  zipCode: string;
  prefecture?: string;
  city?: string;
  street?: string;
  building?: string;
  phone?: string;
  email?: string;
  birthYear?: string;
  birthMonth?: string;
  birthDate?: string;
  note?: string;
  memo?: string;
  delivery: string;
}

const hiraganaRegex = /^[\u3040-\u309Fー]+$/;

export default function CustomerEditPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<ICustomer>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/customers/detail", {
        field_name: "id",
        field_value: id.toString(),
      });
      if (res.status === 200) {
        setCustomer(res.data[0]);
      }
      setIsLoading(false);
    }
    fetchCustomerData();
  }, [])

  const router = useRouter();
  // Year, Month, Date
  const tenYearsAgo = new Date().getFullYear() - 10;
  const yearsArray = [""], monthArray = [""], dateArray = [""];
  for (let year = 1924; year <= tenYearsAgo; year++) {
    yearsArray.push(year.toString());
  }

  for (let month = 1; month <= 12; month++) {
    monthArray.push(month.toString() + "月");
  }

  for (let date = 1; date <= 31; date++) {
    dateArray.push(date.toString());
  }

  const schema = yup.object().shape({
    customerStatus: yup.string().required("入力してください。"),
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
    zipCode: yup.string().required("入力してください。")
      .test('is-not-empty', '7桁の数字で入力してください', (value) => {
        value = value.replaceAll('-', '')
        return /^\d+$/.test(value) && value.length === 7;
      }),
    // phone: yup.string().notRequired()
    //   .test('is-not-empty', '電話番号を正しく入力してください', (value) => {
    //     value = value.replaceAll('-', '')
    //     return /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/g.test(value)
    //   }),
    email: yup.string().email("メールアドレスを正しく入力してください")
      .max(80, "80字以内で入力してください"),
    delivery: yup.string().required("入力してください。"),
  });

  const {
    control,
    handleSubmit,
    watch, setValue,
    formState: { errors },
  } = useForm<ICustomerForm>({
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


  const onSubmit = async (data: ICustomerForm) => {
    const {
      customerStatus, lastName, firstName, seiName, meiName,
      zipCode, prefecture, city, street, building,
      phone, email, birthYear, birthMonth, birthDate,
      note, memo, delivery
    } = data;

    let year = -1;
    let month = -1;
    let date = -1;

    const phoneNumber = phone?.replaceAll("-", "");

    if (birthYear && birthMonth && birthDate) {
      year = Number(birthYear);
      month = Number(birthMonth.slice(0, -1));
      date = Number(birthDate);

      const birthday = new Date(year, month - 1, date);
      year = birthday.getFullYear();
      month = birthday.getMonth() + 1;
      date = birthday.getDate();
    }

    const res = await axios.post('/api/customers/update', {
      id,
      field_names: ["status", "lastName", "firstName", "seiName", "meiName",
        "zipCode", "prefecture", "city", "street", "building",
        "phone", "email", "birthYear", "birthMonth", "birthDate",
        "note", "memo", "delivery"],
      field_values: [customerStatus, lastName, firstName, seiName, meiName,
        zipCode, prefecture, city, street, building,
        phoneNumber, email, year, month, date,
        note, memo, delivery,
      ]
    });

    router.push(`/customers/${id}`);
  };

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] mb-2 text-xl p-0 pl-2 font-bold ">
            顧客の編集
          </h1>
        </div>
        <div className="bg-white w-full p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Customer Status */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="customerStatus">ステータス</InputLabel>
              </div>
              <div className="w-full">
                <SelectBox
                  id="customerStatus"
                  names={customerStatus.slice(1)}
                  value={customer?.status}
                  control={control}
                  className="max-w-[120px]"
                />
              </div>
            </div>

            {/* Client Name */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel>顧客名(姓/名)</InputLabel>
                <RequiredLabel />
              </div>
              <div className="w-full">
                <div className="flex gap-x-4">
                  <InputField id="lastName" control={control} value={customer?.lastName} className="w-1/4" placeholder="例）見学" />
                  <InputField id="firstName" control={control} value={customer?.firstName} className="w-1/4" placeholder="例）太郎" />
                </div>
                {(errors.lastName || errors.firstName) && (
                  <p className="text-sm mt-3 text-m-red">
                    入力してください。
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
                  <InputField id="seiName" control={control} value={customer?.seiName} className="w-1/4" placeholder="例）けんがく" />
                  <InputField id="meiName" control={control} value={customer?.meiName} className="w-1/4" placeholder="例）たろう" />
                </div>
                {(errors.seiName || errors.meiName) && (
                  <p className="text-sm mt-3 text-m-red">
                    入力してください。
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
                <RequiredLabel />
              </div>
              <div className="w-full">
                <div className="flex gap-x-4">
                  <InputField id="zipCode" control={control} value={customer?.zipCode} className="w-1/4" placeholder="例）000-0000" />
                  <InputField id="prefecture" control={control} value={customer?.prefecture} className="w-1/4" placeholder="例）鹿児島県" />
                </div>
                {(errors.zipCode) && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.zipCode?.message}
                  </p>
                )}
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
                  <InputField id="city" control={control} value={customer?.city} className="w-2/5" placeholder="例）姶良市加治木町" />
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
                  <InputField id="street" control={control} value={customer?.street} className="w-2/5" placeholder="例）〇〇町1丁目23-45" />
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
                  <InputField id="building" control={control} value={customer?.building} className="w-2/5" placeholder="例）〇〇マンション〇号室" />
                </div>
                <p className="text-sm mt-2">
                  空白は自動的に除去されます。全角英数字は自動的に半角に変換されます
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="email">メールアドレス</InputLabel>
              </div>
              <div className="w-full">
                <InputField id="email" control={control} value={customer?.email} className="w-2/5" />
              </div>
            </div>

            {/* Contract Phone */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="phone">連絡先電話番号</InputLabel>
              </div>

              <div className="w-full">
                <InputField id="phone" control={control} value={customer?.phone} className="w-2/5" />
                <p className="text-sm mt-2">
                  半角数字、-（ハイフン）
                </p>
              </div>
            </div>

            {/* Customer Birthday */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel>生年月日</InputLabel>
              </div>
              <div className="flex w-full gap-x-2">
                <SelectBox
                  id="birthYear"
                  names={yearsArray}
                  value={customer?.birthYear.toString()}
                  control={control}
                  className="max-w-[80px]"
                />
                <SelectBox
                  id="birthMonth"
                  names={monthArray}
                  control={control}
                  value={customer?.birthMonth.toString() + "月"}
                  className="max-w-[80px]"
                />
                <SelectBox
                  id="birthDate"
                  names={dateArray}
                  control={control}
                  value={customer?.birthDate.toString()}
                  className="max-w-[80px]"
                />
              </div>
            </div>

            {/* Memo */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="memo">
                  社内向け備考欄
                </InputLabel>
              </div>
              <div className="w-full">
                <MultilineField id="memo" control={control} value={customer?.memo} />
              </div>
            </div>

            {/* Contract Info */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel htmlFor="note">
                  質問・ご連絡事項
                </InputLabel>
              </div>
              <div className="w-full">
                <MultilineField id="note" control={control} value={customer?.note} />
              </div>
            </div>

            {/* Client Delivery */}
            <div className="flex items-center mt-5">
              <div className="flex min-w-[230px] justify-end pr-5">
                <InputLabel>配信可否ステータス</InputLabel>
                <RequiredLabel />
              </div>
              <div className="flex w-full gap-x-2">
                <SelectBox
                  id="delivery"
                  names={["配信可", "配信不可", "未確認"]}
                  control={control}
                  value={customer?.delivery}
                  className="max-w-[120px]"
                />
              </div>
            </div>

            {/* Register Button */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5"></div>
              <div className="w-full">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
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
        <EditBackBtn className="mt-4" linkUrl={`/customers/${id}`} />
      </div>
    )
  )
}
