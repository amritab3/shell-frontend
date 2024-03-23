import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootAdminLayout from "@/layouts/AdminLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "An eCommerce platform",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootAdminLayout>{children}</RootAdminLayout>
      </body>
    </html>
  );
}
