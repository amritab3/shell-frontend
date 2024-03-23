import ThemeRegistry from "@/theme/ThemeRegistry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Grid from "@mui/material/Grid";

import { ReduxProvider } from "@/redux/provider";
import Toast from "@/components/Toast";

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
        <ReduxProvider>
          <ThemeRegistry>
            <Grid
              container
              sx={{
                height: "100vh",
                flexGrow: 1,
              }}
            >
              <Grid item xs={12}>
                {children}
              </Grid>
            </Grid>
            <Toast />
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
