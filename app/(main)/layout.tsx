"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/molecules/SideBar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/molecules/loading";

const Middleware = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathName = usePathname()

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

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
