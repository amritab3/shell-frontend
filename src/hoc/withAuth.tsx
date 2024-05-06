"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect, usePathname } from "next/navigation";

import { RootState } from "@/redux/store";
import { setPreviousRoute } from "@/redux/features/miscSlice";

export default function withAuth(Component: any) {
  return function IsAuth(props: any) {
    const dispatch = useDispatch();
    const path = usePathname();
    const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

    useEffect(() => {
      if (!isLoggedIn) {
        dispatch(setPreviousRoute(path));
        return redirect("/login");
      }
    });

    // if (!isLoggedIn) {
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
