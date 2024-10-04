"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/molecules/loading";
import { useCookies } from "react-cookie";

export default function LogOut() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    setIsLoading(false);
    removeCookie('user', { path: '/' });
    router.push("/login");
  }, []);

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <></>
    )
  )
}
