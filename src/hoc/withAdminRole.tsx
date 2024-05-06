"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { redirect, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

import { RootState } from "@/redux/store";
import { openToast } from "@/redux/features/toastSlice";
import { logout } from "@/redux/features/userSlice";
import { setPreviousRoute } from "@/redux/features/miscSlice";

export default function withAdminRole(Component: any) {
  return function IsAuth(props: any) {
    const path = usePathname();
    const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const isShopAdmin = useSelector(
      (state: RootState) => state.user.isShopAdmin,
    );
    const dispatch = useDispatch();

    useEffect(() => {
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
