import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { createContext, useContext, ReactNode } from "react";

import Loading from "@/components/molecules/loading";
import Sidebar from "@/components/molecules/SideBar/Sidebar";
import ChildSidebar from "@/components/molecules/SideBar/ChildSidebar";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const isAuthenticatedUser = async () => {

      if (!cookies['user']) {
        router.push("/login");
        return;
      }

      const { access_token, refresh_token } = cookies['user'];
      const { exp: accessTokenExp = 0 } = jwtDecode(access_token) || {};
      const { exp: refreshTokenExp = 0 } = jwtDecode(refresh_token) || {};

      const currentTime = Date.now() / 1000;

      if (refreshTokenExp < currentTime) {
        router.push('/login');
        return;
      }

      let new_access_token = access_token;

      if (accessTokenExp < currentTime) {
        try {
          const { data: newToken } = await axios.post("/api/auth/refreshToken", {
            refresh_token,
          });
          new_access_token = newToken;
        } catch (error) {
          console.error('Error refreshing token', error);
          router.push('/login');
          return;
        }
      }

      setCookie('user', {
        ...cookies['user'],
        access_token: new_access_token,
      })

      try {
        const { data: isAuthenticated } = await axios.post("/api/auth/verify", {
          access_token: new_access_token,
        });

        if (!isAuthenticated) {
          router.push("/login");
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error verifying token', error);
        router.push("/login");
      }
    }
    isAuthenticatedUser();
  }, [router, pathName]);

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <div className="flex">
        {cookies['user'].subId !== -1 ? <ChildSidebar /> : cookies['user'].isParent === 1 ? <Sidebar /> : <ChildSidebar />}
        {children}
      </div>
    )
  )
};