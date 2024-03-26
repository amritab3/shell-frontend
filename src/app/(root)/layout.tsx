import React from "react";
import type { Metadata } from "next";

import DefaultLayout from "@/layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "ThreadSwap",
  description: "An eCommerce platform",
};

const NavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <DefaultLayout>{children}</DefaultLayout>
    </section>
  );
};

export default NavLayout;
