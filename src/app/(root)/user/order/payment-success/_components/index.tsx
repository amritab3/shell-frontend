import React from "react";
import type { Metadata } from "next";

import NotFound from "@/components/404";

export const metadata: Metadata = {
  title: "Payment Success",
  description: "An eCommerce platform",
};

const PaymentSuccess = () => {
  return <NotFound pageName="Payment Success" />;
};

export default PaymentSuccess;
