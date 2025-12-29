import React, { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Search state (da lepo radi i na klik na ikonici)
  const [searchValue, setSearchValue] = useState("");

  // Mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Avatar menu
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  // (opciono) badge brojevi – ovde stavi realne vrednosti iz store-a kad budeš imao
  const favoritesCount = 2;
  const cartCount = 1;

  const token = useMemo(
    () => localStorage.getItem("auth_token"),
    [location.key]
  );

  const user = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error("Neuspešno dekodiranje tokena:", e);
      return null;
    }
  }, [token]);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const goSearch = () => {
    const q = searchValue.trim();
    if (!q) return;
    navigate(`/?keyword=${encodeURIComponent(q)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    setAnchorEl(null);
    navigate("/login");
  };

  const NavLinksLoggedOut = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Button
        variant="text"
        startIcon={<LoginOutlinedIcon />}
        onClick={() => navigate("/login")}
        sx={{ textTransform: "none", fontWeight: 700, borderRadius: 3 }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        startIcon={<PersonAddAltOutlinedIcon />}
        onClick={() => navigate("/signup")}
        sx={{ textTransform: "none", fontWeight: 800, borderRadius: 3 }}
      >
        Sign Up
      </Button>
    </Box>
  );

  const NavLinksLoggedIn = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
      <Tooltip title="Favorites">
        <IconButton
          onClick={() => navigate("/favorites")}
          sx={{ borderRadius: 3 }}
        >
          <Badge badgeContent={favoritesCount} color="primary">
            <FavoriteBorderIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Cart">
        <IconButton onClick={() => navigate("/cart")} sx={{ borderRadius: 3 }}>
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => navigate("/addproduct")}
        sx={{
          textTransform: "none",
          fontWeight: 900,
          borderRadius: 3,
          px: 2,
          display: { xs: "none", md: "inline-flex" },
        }}
      >
        Dodaj predmet
      </Button>

      <Tooltip title="Profil">
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ borderRadius: 3 }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "rgba(25,118,210,0.15)",
              color: "primary.main",
              fontWeight: 900,
            }}
          >
            {(user?.username?.[0] || user?.name?.[0] || "R").toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            minWidth: 220,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/");
          }}
        >
          <ListItemIcon>
            <HomeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate(`/profile/${user?.userId}`);
          }}
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/admin");
          }}
        >
          <ListItemIcon>
            <AdminPanelSettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Admin
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.9)",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1, gap: 2 }}>
            {/* Mobile menu button */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                borderRadius: 3,
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: 900, fontSize: 22, letterSpacing: 0.2 }}
              >
                Rentify
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", mt: 0.2 }}
              >
                Rent. Save. Repeat.
              </Typography>
            </Box>

            {/* Search */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: { xs: "100%", md: 560 },
                  maxWidth: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 0.8,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "rgba(245,247,250,1)",
                }}
              >
                <SearchIcon sx={{ color: "text.secondary" }} />
                <InputBase
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Pretraži predmete (npr. GoPro, šator...)"
                  sx={{ flex: 1 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") goSearch();
                  }}
                />
                <Button
                  variant="contained"
                  onClick={goSearch}
                  sx={{
                    textTransform: "none",
                    fontWeight: 800,
                    borderRadius: 3,
                    px: 2,
                    display: { xs: "none", sm: "inline-flex" },
                  }}
                >
                  Search
                </Button>
              </Box>
            </Box>

            {/* Right side */}
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {!isLoggedIn ? <NavLinksLoggedOut /> : <NavLinksLoggedIn />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          },
        }}
      >
        <Box sx={{ p: 2.2 }}>
          <Typography sx={{ fontWeight: 900, fontSize: 20 }}>
            Rentify
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Navigacija
          </Typography>
        </Box>

        <Divider />

        <List sx={{ px: 1 }}>
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate("/");
            }}
            sx={{ borderRadius: 3, mx: 1 }}
          >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          {isLoggedIn && (
            <>
              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  navigate("/favorites");
                }}
                sx={{ borderRadius: 3, mx: 1 }}
              >
                <ListItemIcon>
                  <FavoriteBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Favorites" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  navigate("/cart");
                }}
                sx={{ borderRadius: 3, mx: 1 }}
              >
                <ListItemIcon>
                  <ShoppingCartOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  navigate("/addproduct");
                }}
                sx={{ borderRadius: 3, mx: 1 }}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Dodaj predmet" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  navigate(`/profile/${user?.userId}`);
                }}
                sx={{ borderRadius: 3, mx: 1 }}
              >
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  navigate("/admin");
                }}
                sx={{ borderRadius: 3, mx: 1 }}
              >
                <ListItemIcon>
                  <AdminPanelSettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItemButton>

              <Divider sx={{ my: 1 }} />

              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  handleLogout();
                }}
                sx={{ borderRadius: 3, mx: 1 }}
              >
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </>
          )}

          {!isLoggedIn && (
            <>
              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  navigate("/login");
                }}
                sx={{ borderRadius: 3, mx: 1 }}
              >
                <ListItemIcon>
                  <LoginOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  navigate("/signup");
                }}
                sx={{ borderRadius: 3, mx: 1 }}
              >
                <ListItemIcon>
                  <PersonAddAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
