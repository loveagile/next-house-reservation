"use client";

import theme from "@/utils/theme";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <RecoilRoot>
              {children}
            </RecoilRoot>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
