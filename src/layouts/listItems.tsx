import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

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

export const MainListItems = () => {
  const router = useRouter();

  const [openProducts, setOpenProducts] = React.useState(false);

  const expandProducts = () => {
    setOpenProducts(!openProducts);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => router.push("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton onClick={expandProducts}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {openProducts ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProducts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => router.push("/dashboard/products/instore")}
          >
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Instore Products" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => router.push("/dashboard/products/thrift")}
          >
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Thrift Products" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => router.push("/dashboard/users")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
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
