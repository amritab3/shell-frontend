import React from "react";
import type { Metadata } from "next";

import NotFound from "@/components/404";

export const metadata: Metadata = {
  title: "Payment Failed",
  description: "An eCommerce platform",
};

const PaymentFailed = () => {
  return <NotFound pageName="Payment Failed" />;
};

export default PaymentFailed;
