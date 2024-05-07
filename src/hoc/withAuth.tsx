"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect, usePathname, useRouter } from "next/navigation";

import { RootState } from "@/redux/store";
import { setPreviousRoute } from "@/redux/features/miscSlice";
import URLS from "@/utils/urls";
import HttpError from "@/utils/HttpError";
import { logout, setTokensAfterRefresh } from "@/redux/features/userSlice";
import { openToast } from "@/redux/features/toastSlice";
import { clearCart } from "@/redux/features/cartSlice";

export default function withAuth(Component: any) {
  return function IsAuth(props: any) {
    const dispatch = useDispatch();
    const router = useRouter();
    const path = usePathname();
    const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const accessToken = useSelector(
      (state: RootState) => state.user.access_token,
    );
    const refreshToken = useSelector(
      (state: RootState) => state.user.refresh_token,
    );

    useEffect(() => {
      const verifyAndRefreshToken = async () => {
        try {
          const verifyResp = await fetch(URLS.TOKEN_VERIFY_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: accessToken }),
          });
          if (verifyResp.ok) {
            return await verifyResp.json();
          }

          if (verifyResp.status === 401) {
            const refreshResp = await fetch(URLS.TOKEN_REFRESH_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh: refreshToken }),
            });

            if (refreshResp.ok) {
              const refreshTokenData = await refreshResp.json();
              dispatch(setTokensAfterRefresh(refreshTokenData));
              router.refresh();
            }

            if (refreshResp.status === 401) {
              const refreshRespErrorData = await verifyResp.json();
              throw new HttpError(
                refreshRespErrorData.detail,
                verifyResp.status,
                verifyResp.statusText,
                {
                  cause: refreshRespErrorData.code,
                },
              );
            }
          }
        } catch (err: any) {
          dispatch(
            openToast({
              message: "Please login again",
              severity: "info",
            }),
          );
          await dispatch(logout());
          dispatch(clearCart());
          dispatch(setPreviousRoute(path));
          router.push("/login");
        }
      };

      if (!isLoggedIn) {
        dispatch(setPreviousRoute(path));
        return redirect("/login");
      } else {
        verifyAndRefreshToken();
      }
    });

    return <Component {...props} />;
  };
}
