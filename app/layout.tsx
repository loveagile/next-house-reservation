"use client";

import theme from "@/utils/theme";
import type { Metadata } from "next";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from '@mui/material/styles';
import "./globals.css";

const metadata: Metadata = {
  title: "スマイルビルダーズ",
  description: "スマイルビルダーズは、住宅見学のイベントを一元管理できるクラウドサービスです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            {children}
          </RecoilRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
