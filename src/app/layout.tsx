import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ReduxProvider } from "@/redux/provider";
import Toast from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThreadSwap",
  description: "An eCommerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeRegistry>
            {children}
            <Toast />
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
