"use client";

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

import PhotoSizeSelectActualRoundedIcon from "@mui/icons-material/PhotoSizeSelectActualRounded";
import SourceRoundedIcon from "@mui/icons-material/SourceRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import OtherHousesRoundedIcon from "@mui/icons-material/OtherHousesRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

import "./Sidebar.css";

const menues = [
  {
    label: "Enterpriseプラン",
    icon: <></>,
    submenues: [
      {
        label: "利用内容の確認",
        link: "/claim",
      },
      {
        label: "アカウント枠数変更",
        link: "/settings/account_slot_count/edit",
      },
    ],
  },
  {
    label: "イベント作成",
    icon: <PhotoSizeSelectActualRoundedIcon />,
    submenues: [
      {
        label: "新規作成",
        link: "/events/create",
      },
      {
        label: "イベント一覧",
        link: "/events/list",
      },
      {
        label: "まとめページ作成",
        link: "/campaigns/create",
      },
      {
        label: "まとめページ一覧",
        link: "/campaigns/list",
      },
    ],
  },
  {
    label: "メール/SMS送信",
    icon: <SourceRoundedIcon />,
    submenues: [
      {
        label: "イベント案内メール",
        link: "#",
        submenues: [
          {
            label: "新規送信",
            link: "/event_mails/new",
          },
          {
            label: "送信履歴",
            link: "/event_mails",
          },
        ],
      },
      {
        label: "繰り返しメール",
        link: "#",
        submenues: [
          {
            label: "新規配信設定",
            link: "/recurring_event_mails",
          },
          {
            label: "配信設定一覧",
            link: "/recurring_event_mails",
          },
        ],
      },
      {
        label: "SMS申し込み",
        link: "/short_message_owners/new",
      },
    ],
  },
  {
    label: "予約確認",
    icon: <EditCalendarRoundedIcon />,
    submenues: [
      {
        label: "予約一覧",
        link: "#",
        submenues: [
          {
            label: "新着順表示",
            link: "/reservations/list",
          },
          {
            label: "カレンダー表示",
            link: "/calendars",
          },
        ],
      },
      {
        label: "日程調整中一覧",
        link: "/candidates",
      },
    ],
  },
  {
    label: "問い合わせ確認",
    icon: <ContactMailRoundedIcon />,
    submenues: [
      {
        label: "問い合わせ",
        link: "/select_contact_forms",
      },
      {
        label: "資料請求",
        link: "/select_document_request_forms",
      },
    ],
  },
  {
    label: "顧客管理",
    icon: <ContactMailRoundedIcon />,
    submenues: [
      {
        label: "顧客一覧",
        link: "/customers",
      },
    ],
  },
  {
    label: "グループ管理",
    icon: <Diversity3RoundedIcon />,
    submenues: [
      {
        label: "所属会社管理",
        link: "/group",
      },
      {
        label: "掲載イベント管理",
        link: "/managed_group_events",
      },
      {
        label: "予約確認",
        link: "/managed_group_reserve_events",
      },
      {
        label: "顧客確認",
        link: "/managed_group_customers",
      },
    ],
  },
  {
    label: "アカウント管理",
    icon: <PersonAddAltRoundedIcon />,
    submenues: [],
    link: "/eventer_staffs",
  },
  {
    label: "無人見学設定",
    icon: <OtherHousesRoundedIcon />,
    submenues: [
      {
        label: "スマートロック",
        link: "/settings/integrations/showtimes",
      },
    ],
  },
  {
    label: "サポートに問い合わせ",
    icon: <InfoRoundedIcon />,
    submenues: [
      {
        label: "オンラインマニュアル",
        link: "/help",
      },
      {
        label: "フォームから問い合わせ",
        link: "/contact/new",
      },
    ],
  },
  {
    label: "その他",
    icon: <InfoRoundedIcon />,
    submenues: [
      {
        label: "システム設定",
        link: "/settings",
      },
      {
        label: "ログイン情報編集",
        link: "/staff/edit",
      },
      {
        label: "LINE通知設定",
        link: "/line-settings/edit",
      },
      {
        label: "利用規約",
        link: "/home/terms_of_service",
      },
      {
        label: "プライバシーポリシー",
        link: "/home/privacy_policy",
      },
      {
        label: "ログアウト",
        link: "/staff/sign_out",
      },
    ],
  },
];

export default function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<number>(-1);
  const [hoveredSubItem, setHoveredSubItem] = useState<number>(-1);

  return (
    <Box className="fixed h-full w-[240px] bg-dark-gray z-50">
      <List className="text-light-gray relative">
        {menues.map((item, index) => (
          <div key={index}>
            <ListItem
              disablePadding
              className="hover:bg-hover-green"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(-1)}
            >
              <ListItemButton
                className="button"
                href={item.link ? item.link : "#"}
              >
                <ListItemIcon className="icon">{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {!item.link && (
                  <ListItemIcon className="text-light-gray icon">
                    <ArrowForwardIosRoundedIcon />
                  </ListItemIcon>
                )}
              </ListItemButton>
              {hoveredItem === index && (
                <List className="w-[240px] bg-dark-gray absolute left-[240px] top-0 p-0">
                  {item.submenues.map((subitem, subindex) => (
                    <div key={subindex}>
                      <ListItem
                        disablePadding
                        className="hover:bg-hover-green py-1"
                        onMouseEnter={() => setHoveredSubItem(subindex)}
                        onMouseLeave={() => setHoveredSubItem(-1)}
                      >
                        <ListItemButton className="button" href={subitem.link}>
                          <ListItemText primary={subitem.label} />
                          {subitem.submenues && (
                            <ListItemIcon className="text-light-gray icon">
                              <ArrowForwardIosRoundedIcon />
                            </ListItemIcon>
                          )}
                        </ListItemButton>
                        {hoveredSubItem === subindex && (
                          <List className="w-[240px] bg-dark-gray absolute left-[240px] top-0 p-0">
                            {subitem.submenues?.map((sub_subitem, index) => (
                              <Link
                                href={sub_subitem.link}
                                key={index}
                                className="text-light-gray no-underline"
                              >
                                <ListItem
                                  disablePadding
                                  className="hover:bg-hover-green py-1"
                                >
                                  <ListItemButton className="button">
                                    <ListItemText primary={sub_subitem.label} />
                                  </ListItemButton>
                                </ListItem>
                                <Divider className="border-border-gray" />
                              </Link>
                            ))}
                          </List>
                        )}
                      </ListItem>
                      <Divider className="border-border-gray" />
                    </div>
                  ))}
                </List>
              )}
            </ListItem>
            <Divider className="border-border-gray" />
          </div>
        ))}
      </List>
    </Box>
  );
}
