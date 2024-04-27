"use client";

import React from "react";

import { usePathname } from "next/navigation";

import NotFound from "@/components/404";
import DefaultLayout from "@/layouts/DefaultLayout";
import RootAdminLayout from "@/layouts/AdminLayout";

const NotFoundPage = () => {
  const pathname = usePathname();

  const dashboardRoute = pathname.startsWith("/admin");
  return (
    <section>
      {dashboardRoute ? (
        <RootAdminLayout>
          <NotFound />
        </RootAdminLayout>
      ) : (
        <DefaultLayout>
          <NotFound />
        </DefaultLayout>
      )}
    </section>
  );
};

export default NotFoundPage;
