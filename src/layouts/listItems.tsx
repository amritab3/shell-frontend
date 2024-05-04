import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";

import { logout } from "@/redux/features/userSlice";
import { openToast } from "@/redux/features/toastSlice";
import { RootState } from "@/redux/store";
import {
  toggleAdminProductsCollapse,
  toggleUserManagementCollapse,
} from "@/redux/features/miscSlice";

export const MainListItems = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const adminProductsCollapse = useSelector(
    (state: RootState) => state.misc.adminProductsCollapse,
  );

  const adminUserManagementCollapse = useSelector(
    (state: RootState) => state.misc.adminUserManagementCollapse,
  );

  const expandProductManagement = () => {
    dispatch(toggleAdminProductsCollapse());
  };

  const expandUserManagement = () => {
    dispatch(toggleUserManagementCollapse());
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => router.push("/admin/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton onClick={expandProductManagement}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Product Management" />
        {adminProductsCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={adminProductsCollapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => router.push("/admin/products/instore")}
          >
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Instore Products" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => router.push("/admin/products/thrift")}
          >
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Thrift Products" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={expandUserManagement}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User Management" />
        {adminUserManagementCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={adminUserManagementCollapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => router.push("/admin/users")}
          >
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(openToast({ message: "User logged out", severity: "success" }));
    router.push("/");
  };

  return (
    <React.Fragment>
      {/*<ListSubheader component="div" inset>*/}
      {/*  Saved reports*/}
      {/*</ListSubheader>*/}
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
};
