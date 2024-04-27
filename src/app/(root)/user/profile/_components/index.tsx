"use client";

import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import withAuth from "@/hoc/withAuth";
import ChangePassword from "./ChangePassword";


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
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
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
      <div
        role="tabpanel"
        hidden={value !== 1}
        id={`simple-tabpanel-1`}
        aria-labelledby={`simple-tab-1`}
      >
        {value === 1 && (
          <Box sx={{ p: 3 }}>
            <ChangePassword />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default withAuth(UserProfile);
