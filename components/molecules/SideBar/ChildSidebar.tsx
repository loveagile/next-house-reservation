// "use client";

import * as React from "react";
import Link from "next/link";

import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import PhotoSizeSelectActualRoundedIcon from "@mui/icons-material/PhotoSizeSelectActualRounded";
import SourceRoundedIcon from "@mui/icons-material/SourceRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

const menues = [
  {
    label: "Branchプラン",
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
            link: "/reservations/calendars",
          },
        ],
      },
      {
        label: "日程調整中一覧",
        link: "/reservations/candidate",
      },
    ],
  },
  {
    label: "問い合わせ確認",
    icon: <ContactMailRoundedIcon />,
    submenues: [
      {
        label: "問い合わせ",
        link: "/inquiry/contact",
      },
      {
        label: "資料請求",
        link: "/inquiry/information",
      },
    ],
  },
  {
    label: "アカウント管理",
    icon: <PersonAddAltRoundedIcon />,
    submenues: [],
    link: "/accounts/list",
  },
  {
    label: "サポートに問い合わせ",
    icon: <InfoRoundedIcon />,
    submenues: [
      {
        label: "オンラインマニュアル",
        link: "https://help.kengakucloud.jp/",
      },
      {
        label: "フォームから問い合わせ",
        link: "/contact/create",
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
        link: "/settings/line",
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
        link: "/logout",
      },
    ],
  },
];


export default function ChildSidebar() {
  const [hoveredItem, setHoveredItem] = useState<number>(-1);
  const [hoveredSubItem, setHoveredSubItem] = useState<number>(-1);

  return (
    <Box className="fixed h-full w-[240px] bg-dark-gray z-50">
      <List sx={{
        color: "#cfd8dc",
        position: "relative",
        padding: 0,
      }}>
        {menues.map((item, index) => (
          <div key={index}>
            <ListItem
              disablePadding
              sx={{
                '&:hover': {
                  backgroundColor: '#0098ba',
                }
              }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(-1)}
            >
              <Link
                className="w-full flex items-center p-3"
                href={item.link ? item.link : "#"}
              >
                <ListItemIcon sx={{
                  minWidth: "auto",
                  color: "#cfd8dc",
                  marginRight: "8px",
                  '& .MuiSvgIcon-root': {
                    fontSize: "18px",
                  }
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: "15px",
                  }
                }} />
                {!item.link && (
                  <ListItemIcon sx={{
                    minWidth: "auto",
                    color: "#cfd8dc",
                    marginRight: "8px",
                    '& .MuiSvgIcon-root': {
                      fontSize: "18px",
                    }
                  }}>
                    <ArrowForwardIosRoundedIcon />
                  </ListItemIcon>
                )}
              </Link>
              {hoveredItem === index && (
                <List className="w-[240px] bg-dark-gray absolute left-[240px] top-0 p-0">
                  {item.submenues?.map((subitem, subindex) => (
                    <div key={subindex}>
                      <ListItem
                        disablePadding
                        sx={{
                          '&:hover': {
                            backgroundColor: '#0098ba',
                          }
                        }}
                        onMouseEnter={() => setHoveredSubItem(subindex)}
                        onMouseLeave={() => setHoveredSubItem(-1)}
                      >
                        <Link className="w-full flex items-center p-3" href={subitem.link}>
                          <ListItemText primary={subitem.label} sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: "15px",
                            }
                          }} />
                          {subitem.submenues && (
                            <ListItemIcon sx={{
                              minWidth: "auto",
                              color: "#cfd8dc",
                              marginRight: "8px",
                              '& .MuiSvgIcon-root': {
                                fontSize: "18px",
                              }
                            }}>
                              <ArrowForwardIosRoundedIcon />
                            </ListItemIcon>
                          )}
                        </Link>
                        {hoveredSubItem === subindex && (
                          <List className="w-[240px] bg-dark-gray absolute left-[240px] top-0 p-0">
                            {subitem.submenues?.map((sub_subitem, index) => (
                              <div key={index}>
                                <ListItem
                                  disablePadding
                                  sx={{
                                    '&:hover': {
                                      backgroundColor: '#0098ba',
                                    }
                                  }}
                                >
                                  <Link
                                    href={sub_subitem.link}
                                    className="w-full flex items-center p-3"
                                  >
                                    <ListItemText primary={sub_subitem.label} sx={{
                                      '& .MuiListItemText-primary': {
                                        fontSize: "15px",
                                      }
                                    }} />
                                  </Link>
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
              )}
            </ListItem>
            <Divider className="border-border-gray" />
          </div>
        ))}
      </List>
    </Box >
  );
}
