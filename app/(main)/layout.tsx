"use client";

import axios from "axios";
import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCookies } from "react-cookie";

import Sidebar from "@/components/molecules/SideBar/Sidebar";

const Middleware = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const isAuthenticatedUser = async () => {
      if (!cookies['user']) {
        router.push("/login");
        return;
      }
      const res = await axios.post("/api/auth/verify", {
        id: cookies['user'].id,
        name: cookies['user'].name,
        email: cookies['user'].email,
        accessToken: cookies['user'].accessToken,
      });
      if (!res.data.isAuthenticated) {
        router.push("/login");
        return;
      }
    }
    isAuthenticatedUser();
  }, [router, pathName]);

  return (
    <>
      {children}
    </>
  )
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Middleware>
      <div className="flex" >
        <Sidebar />
        {children}
      </div >
    </Middleware >
  );
}
