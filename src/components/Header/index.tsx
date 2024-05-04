"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";

import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/userSlice";
import { openToast } from "@/redux/features/toastSlice";
import { clearCart } from "@/redux/features/cartSlice";

const navBarItems = [
  { label: "Men", path: "/products/instore/men/" },
  { label: "Women", path: "/products/instore/women/" },
  { label: "Kids", path: "/products/instore/kids/" },
  { label: "Thrift", path: "/products/thrift/" },
];

const settings = [
  { label: "Profile", path: "/user/profile", renderAfterLogin: true },
  {
    label: "Dashboard",
    path: "/admin/dashboard/",
    renderAfterLogin: true,
    requireAdminRole: true,
  },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const isShopAdmin = useSelector((state: RootState) => state.user.isShopAdmin);
  const userAvatarUrl = useSelector(
    (state: RootState) => state.user.userAvatarUrl,
  );
  const numberOfCartItems = useSelector(
    (state: RootState) => state.cart.numberOfItems,
  );

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    dispatch(clearCart());
    dispatch(openToast({ message: "User logged out", severity: "success" }));
    router.push("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navBarItems.map((navBarItem) => (
                <MenuItem key={navBarItem.label}>
                  <Link textAlign="center" href={navBarItem.path}>
                    {navBarItem.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {navBarItems.map((navBarItem) => (
              <Button
                key={navBarItem.label}
                onClick={() => router.push(navBarItem.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {navBarItem.label}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
            }}
          >
            <IconButton color="inherit" onClick={handleOpenCartMenu}>
              <Badge badgeContent={numberOfCartItems}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="cart-menu-appbar"
              anchorEl={anchorElCart}
              disableScrollLock={true}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElCart)}
              onClose={handleCloseCartMenu}
            >
              <MenuItem
                onClick={() => {
                  router.push("/products/cart/");
                  handleCloseCartMenu();
                }}
              >
                <Typography>View Cart</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(clearCart());
                  handleCloseCartMenu();
                }}
              >
                <Typography>Clear Cart</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {isLoggedIn ? (
                <Avatar
                  alt="avatar"
                  src={userAvatarUrl}
                  onClick={handleOpenUserMenu}
                  sx={{ cursor: "pointer" }}
                />
              ) : (
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "white" }}
                >
                  <PersonIcon />
                </IconButton>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="user-menu-appbar"
              anchorEl={anchorElUser}
              disableScrollLock={true}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                return setting.renderAfterLogin ? (
                  isLoggedIn ? (
                    setting.requireAdminRole ? (
                      isAdmin || isShopAdmin ? (
                        <MenuItem
                          key={setting.label}
                          onClick={() => {
                            handleCloseUserMenu();
                            router.push(setting.path);
                          }}
                        >
                          <Typography>{setting.label}</Typography>
                        </MenuItem>
                      ) : null
                    ) : (
                      <MenuItem
                        key={setting.label}
                        onClick={() => {
                          handleCloseUserMenu();
                          router.push(setting.path);
                        }}
                      >
                        <Typography>{setting.label}</Typography>
                      </MenuItem>
                    )
                  ) : null
                ) : (
                  <MenuItem
                    key={setting.label}
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push(setting.path);
                    }}
                  >
                    <Typography>{setting.label}</Typography>
                  </MenuItem>
                );
              })}
              {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    router.push("/login");
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
