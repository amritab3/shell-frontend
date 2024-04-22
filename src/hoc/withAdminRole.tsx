"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";

import { RootState } from "@/redux/store";
import { openToast } from "@/redux/features/toastSlice";
import { logout } from "@/redux/features/userSlice";

export default function withAdminRole(Component: any) {
  return function IsAuth(props: any) {
    const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const isShopAdmin = useSelector(
      (state: RootState) => state.user.isShopAdmin,
    );
    const dispatch = useDispatch();

    console.log(isLoggedIn, isAdmin, isShopAdmin);

    useEffect(() => {
      if (!isAdmin && !isShopAdmin) {
        dispatch(logout());
        dispatch(
          openToast({
            message: "Please login with admin role",
            severity: "error",
          }),
        );

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
