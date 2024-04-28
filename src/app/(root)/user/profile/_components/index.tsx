"use client";

import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import withAuth from "@/hoc/withAuth";
import ChangePassword from "./ChangePassword";
import GeneralInformation from "./GeneralInformation";
import OrdersTable from "./Orders";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const UserProfile = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="User Profile Tabs"
          variant="fullWidth"
          sx={{ width: "100%" }}
          centered
        >
          <Tab label="General Information" {...a11yProps(0)} />
          <Tab label="Password" {...a11yProps(1)} />
          <Tab label="Addresses" {...a11yProps(2)} />
          <Tab label="Orders" {...a11yProps(3)} />
        </Tabs>
      </Box>
      {value === 0 ? (
        <div
          role="tabpanel"
          hidden={value !== 0}
          id={`simple-tabpanel-0`}
          aria-labelledby={`simple-tab-0`}
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "100px",
          }}
        >
          {value === 0 && (
            <Box sx={{ p: 3 }}>
              <GeneralInformation />
            </Box>
          )}
        </div>
      ) : null}

      {value === 1 ? (
        <div
          role="tabpanel"
          hidden={value !== 1}
          id={`simple-tabpanel-1`}
          aria-labelledby={`simple-tab-1`}
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "100px",
          }}
        >
          {value === 1 && (
            <Box sx={{ p: 3 }}>
              <ChangePassword />
            </Box>
          )}
        </div>
      ) : null}
      {value === 3 ? (
        <div
          role="tabpanel"
          hidden={value !== 3}
          id={`simple-tabpanel-3`}
          aria-labelledby={`simple-tab-3`}
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "100px",
          }}
        >
          {value === 3 && (
            <Box sx={{ p: 3 }}>
              <OrdersTable />
            </Box>
          )}
        </div>
      ) : null}
    </Box>
  );
};

export default withAuth(UserProfile);
