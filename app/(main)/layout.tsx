"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/molecules/SideBar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/molecules/loading";

const Middleware = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    setIsLoading(false);

  }, [user, router]);

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <>
        {children}
      </>
    )
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
