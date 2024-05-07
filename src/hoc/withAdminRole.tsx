"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect, usePathname, useRouter } from "next/navigation";

import { RootState } from "@/redux/store";
import { openToast } from "@/redux/features/toastSlice";
import { logout, setTokensAfterRefresh } from "@/redux/features/userSlice";
import { setPreviousRoute } from "@/redux/features/miscSlice";
import URLS from "@/utils/urls";
import HttpError from "@/utils/HttpError";
import { clearCart } from "@/redux/features/cartSlice";

export default function withAdminRole(Component: any) {
  return function IsAuth(props: any) {
    const path = usePathname();
    const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const isShopAdmin = useSelector(
      (state: RootState) => state.user.isShopAdmin,
    );
    const dispatch = useDispatch();
    const accessToken = useSelector(
      (state: RootState) => state.user.access_token,
    );
    const refreshToken = useSelector(
      (state: RootState) => state.user.refresh_token,
    );
    const router = useRouter();

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
              message: "Please login again with admin role",
              severity: "info",
            }),
          );
          await dispatch(logout());
          dispatch(clearCart());
          dispatch(setPreviousRoute(path));
          router.push("/login");
        }
      };

      if (!isAdmin && !isShopAdmin) {
        dispatch(logout());
        dispatch(
          openToast({
            message: "Please login with admin role",
            severity: "error",
          }),
        );
        dispatch(setPreviousRoute(path));
        return redirect("/login");
      } else {
        verifyAndRefreshToken();
      }
    });

    // if (!isAdmin && !isShopAdmin) {
    //   dispatch(logout());
    //   dispatch(
    //     openToast({
    //       message: "Please login with admin role",
    //       severity: "error",
    //     }),
    //   );
    //
    //   return redirect("/login");
    // }

    return <Component {...props} />;
  };
}
