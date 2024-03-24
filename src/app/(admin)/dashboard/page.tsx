import React from "react";
import type { Metadata } from "next";

import NotFound from "@/components/404";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "An eCommerce platform",
};

const Dashboard = () => {
  return <NotFound pageName="Dashboard" />;
};

export default Dashboard;
