"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Loading from "@/components/molecules/loading";

export default function LogOut() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const removeAndRedirect = async () => {
      await removeCookie('user');
      setIsLoading(false);
      router.push("/login");
    };

    removeAndRedirect();
  }, []);

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <></>
    )
  )
}
