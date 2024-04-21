"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

import { RootState } from "@/redux/store";

export default function withAuth(Component: any) {
  return function IsAuth(props: any) {
    const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

    useEffect(() => {
      if (!isLoggedIn) {
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
