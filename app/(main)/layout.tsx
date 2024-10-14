"use client";

import axios from "axios";
import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCookies } from "react-cookie";

import Sidebar from "@/components/molecules/SideBar/Sidebar";
import ChildSidebar from "@/components/molecules/SideBar/ChildSidebar";

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
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  return (
    <Middleware>
      <div className="flex" >
        {cookies['user'].isParent === 1 ? <Sidebar /> : <ChildSidebar />}
        {children}
      </div >
    </Middleware >
  );
}
