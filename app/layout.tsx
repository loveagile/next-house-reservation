"use client";

import theme from "@/utils/theme";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from '@mui/material/styles';
import "./globals.css";

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
