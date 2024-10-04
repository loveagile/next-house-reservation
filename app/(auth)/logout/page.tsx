"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/molecules/loading";

export default function LogOut() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setUser(null);
      router.push("/login");
    }, 200);

    return () => clearTimeout(timeout);
  }, [setUser]);

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <></>
    )
  )
}
