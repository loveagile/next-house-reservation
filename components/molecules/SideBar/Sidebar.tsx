import * as React from "react";
import { useState } from "react";
import Link from "next/link";

import { AiFillPicture } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaCalendarAlt, FaAddressCard } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdInfo } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const menues = [
  {
    label: "スマイルビルダーズ",
    icon: <></>,
    submenues: [
      {
        label: "利用内容の確認",
        link: "/claim",
        submenues: [],
        target: "_self",
      },
      {
        label: "アカウント枠数変更",
        link: "/settings/account_slot_count/edit",
        submenues: [],
        target: "_self",
      },
    ],
  },
  {
    label: "イベント作成",
    icon: <AiFillPicture />,
    submenues: [
      {
        label: "新規作成",
        link: "/events/create",
        submenues: [],
        target: "_self",
      },
      {
        label: "イベント一覧",
        link: "/events/list",
        submenues: [],
        target: "_self",
      },
      {
        label: "まとめページ作成",
        link: "/campaigns/create",
        submenues: [],
        target: "_self",
      },
      {
        label: "まとめページ一覧",
        link: "/campaigns/list",
        submenues: [],
        target: "_self",
      },
    ],
  },
  // {
  //   label: "メール/SMS送信",
  //   icon: <SourceRoundedIcon />,
  //   submenues: [
  //     {
  //       label: "イベント案内メール",
  //       link: "#",
  //       submenues: [
  //         {
  //           label: "新規送信",
  //           link: "/event_mails/new",
  //         },
  //         {
  //           label: "送信履歴",
  //           link: "/event_mails",
  //         },
  //       ],
  //     },
  //     {
  //       label: "繰り返しメール",
  //       link: "#",
  //       submenues: [
  //         {
  //           label: "新規配信設定",
  //           link: "/recurring_event_mails",
  //         },
  //         {
  //           label: "配信設定一覧",
  //           link: "/recurring_event_mails",
  //         },
  //       ],
  //     },
  //     {
  //       label: "SMS申し込み",
  //       link: "/short_message_owners/new",
  //     },
  //   ],
  // },
  {
    label: "予約確認",
    icon: <FaCalendarAlt />,
    submenues: [
      {
        label: "予約一覧",
        link: "#",
        target: "_self",
        submenues: [
          {
            label: "新着順表示",
            link: "/reservations/list",
            submenues: [],
            target: "_self",
          },
          {
            label: "カレンダー表示",
            link: "/reservations/calendars",
            submenues: [],
            target: "_self",
          },
        ],
      },
      {
        label: "日程調整中一覧",
        link: "/reservations/candidate",
        submenues: [],
        target: "_self",
      },
    ],
  },
  {
    label: "問い合わせ確認",
    icon: <FaAddressCard />,
    submenues: [
      {
        label: "問い合わせ",
        link: "/inquiry/contact",
        submenues: [],
        target: "_self",
      },
      {
        label: "資料請求",
        link: "/inquiry/information",
        submenues: [],
        target: "_self",
      },
    ],
  },
  {
    label: "顧客管理",
    icon: <FaAddressCard />,
    submenues: [
      {
        label: "顧客一覧",
        link: "/customers/list",
        submenues: [],
        target: "_self",
      },
    ],
  },
  {
    label: "グループ管理",
    icon: <HiMiniUserGroup />,
    submenues: [
      {
        label: "所属会社管理",
        link: "/group",
        submenues: [],
        target: "_self",
      },
      {
        label: "掲載イベント管理",
        link: "/group/events",
        submenues: [],
        target: "_self",
      },
      {
        label: "予約確認",
        link: "/group/reservations",
        submenues: [],
        target: "_self",
      },
      {
        label: "顧客確認",
        link: "/group/customers",
        submenues: [],
        target: "_self",
      },
    ],
  },
  {
    label: "アカウント管理",
    icon: <BsPersonPlusFill />,
    submenues: [],
    link: "/accounts/list",
  },
  {
    label: "サポートに問い合わせ",
    icon: <MdInfo />,
    submenues: [
      {
        label: "オンラインマニュアル",
        link: "https://help.kengakucloud.jp/",
        submenues: [],
        target: "_blank",
      },
      {
        label: "フォームから問い合わせ",
        link: "/contact/create",
        submenues: [],
        target: "_self",
      },
    ],
  },
  {
    label: "その他",
    icon: <MdInfo />,
    submenues: [
      {
        label: "システム設定",
        link: "/settings",
        submenues: [],
        target: "_self",
      },
      {
        label: "ログイン情報編集",
        link: "/staff/edit",
        submenues: [],
        target: "_self",
      },
      {
        label: "LINE通知設定",
        link: "/settings/line",
        submenues: [],
        target: "_self",
      },
      {
        label: "利用規約",
        link: "/home/terms_of_service",
        submenues: [],
        target: "_blank",
      },
      {
        label: "プライバシーポリシー",
        link: "/home/privacy_policy",
        submenues: [],
        target: "_blank",
      },
      {
        label: "ログアウト",
        link: "/logout",
        submenues: [],
        target: "_self",
      },
    ],
  },
];

export default function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<number>(-1);
  const [hoveredSubItem, setHoveredSubItem] = useState<number>(-1);

  return (
    <div className="fixed h-full w-[240px] bg-dark-gray z-50">
      <ul className="p-0 relative text-[#cfd8dc]">
        {menues.map((item, index) => (
          <div key={index}>
            <li className="py-1 hover:bg-[#0098ba] relative"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(-1)}
            >
              <Link
                className="w-full flex items-center p-3"
                href={item.link ? item.link : "#"}
              >
                <span className="mr-2 text-xl">
                  {item.icon}
                </span>
                <span className="text-[15px]">
                  {item.label}
                </span>
                {!item.link && (
                  <IoIosArrowForward className="text-xl ml-auto" />
                )}
              </Link>
              {hoveredItem === index && (
                <ul className="w-[240px] bg-dark-gray absolute left-[240px] top-0 p-0">
                  {item.submenues.map((subitem, subindex) => (
                    <div key={subindex}>
                      <li className="py-1 hover:bg-[#0098ba]"
                        onMouseEnter={() => setHoveredSubItem(subindex)}
                        onMouseLeave={() => setHoveredSubItem(-1)}
                      >
                        <Link className="w-full flex items-center p-3" href={subitem.link} target={subitem.target}>
                          <span className="text-[15px]">
                            {subitem.label}
                          </span>
                          {subitem.submenues.length > 0 && (
                            <IoIosArrowForward className="text-xl ml-auto" />
                          )}
                        </Link>
                        {hoveredSubItem === subindex && (
                          <ul className="w-[240px] bg-dark-gray absolute left-[240px] top-0 p-0">
                            {subitem.submenues.map((sub_subitem, index) => (
                              <div key={index}>
                                <li className="py-1 hover:bg-[#0098ba]">
                                  <Link
                                    href={sub_subitem.link}
                                    className="w-full flex items-center p-3"
                                    target={sub_subitem.target}
                                  >
                                    <span className="text-[15px]">
                                      {sub_subitem.label}
                                    </span>
                                  </Link>
                                </li>
                                <hr className="border-border-gray" />
                              </div>
                            ))}
                          </ul>
                        )}
                      </li>
                      <hr className="border-border-gray" />
                    </div>
                  ))}
                </ul>
              )}
            </li>
            <hr className="border-border-gray" />
          </div>
        ))
        }
      </ul >
    </div >
  );
}
