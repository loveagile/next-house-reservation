"use client";

import { RecoilRoot } from "recoil";
import "./globals.css";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className="flex">
        <Sidebar />
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
