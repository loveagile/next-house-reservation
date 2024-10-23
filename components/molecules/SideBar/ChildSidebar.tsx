import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";

import { AiFillPicture } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiArrowGoBackFill } from "react-icons/ri";

const menues = [
  {
    label: "Branchプラン",
    icon: <></>,
    submenues: [
      {
        label: "利用内容の確認",
        link: "/claim",
        target: "_self",
        submenues: [],
      },
      {
        label: "アカウント枠数変更",
        link: "/settings/account_slot_count/edit",
        target: "_self",
        submenues: [],
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
        target: "_self",
        submenues: [],
      },
      {
        label: "イベント一覧",
        link: "/events/list",
        target: "_self",
        submenues: [],
      },
    ],
  },
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
            target: "_self",
          },
          {
            label: "カレンダー表示",
            link: "/reservations/calendars",
            target: "_self",
          },
        ],
      },
    ],
  },
  {
    label: "アカウント管理",
    icon: <BsPersonPlusFill />,
    link: "/accounts/list",
    target: "_self",
    submenues: [],
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
      },
      {
        label: "ログイン情報編集",
        link: "/staff/edit",
        submenues: [],
      },
      {
        label: "LINE通知設定",
        link: "/settings/line",
        submenues: [],
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
      },
    ],
  },
];

export default function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<number>(-1);
  const [hoveredSubItem, setHoveredSubItem] = useState<number>(-1);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

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
                target={item.target}
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
              {hoveredItem === index && item.submenues && (
                <ul className="w-[240px] bg-dark-gray absolute left-[240px] top-0 p-0">
                  {item.submenues.map((subitem, subindex) => (
                    <div key={subindex}>
                      <li className="py-1 hover:bg-[#0098ba]"
                        onMouseEnter={() => setHoveredSubItem(subindex)}
                        onMouseLeave={() => setHoveredSubItem(-1)}
                      >
                        <Link className="w-full flex items-center p-3"
                          href={subitem.link}
                          target={subitem.target}
                        >
                          <span className="text-[15px]">
                            {subitem.label}
                          </span>
                          {subitem.submenues.length > 0 && (
                            <IoIosArrowForward className="text-xl ml-auto" />
                          )}
                        </Link>
                        {hoveredSubItem === subindex && subitem.submenues && (
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
      {cookies['user'].subId !== -1 && (
        <>
          <Link
            className="w-full flex items-center p-3 text-white font-bold bg-[#e99b54] py-4"
            href="/group"
            onClick={() => {
              setCookie('user', {
                ...cookies['user'],
                subId: -1,
              })
            }}
          >
            <span className="mr-2 text-xl">
              <RiArrowGoBackFill className="font-bold" />
            </span>
            <span className="text-[15px]">
              親アカウントに戻る
            </span>
          </Link>
          <hr className="border-border-gray" />
        </>
      )}
    </div >
  );
}
