import Link from "next/link";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar
} from "@mui/material";

const drawerWidth = 240;
const navItems = ["Cliente", "Condutor"];
const header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      {/* img logo */}
      <Link href="/">
        <Box
          src="/favicon.svg"
          alt="Logo icon"
          component="img"
          sx={{
            my: 2
          }}
        />
      </Link>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", position: "sticky", top: 0 }}>
      <AppBar component="nav" sx={{ position: "initial" }}>
        <Toolbar>
          {/* img logo */}
          <Link href="/">
            <Box
              src="/favicon.svg"
              alt="Logo icon"
              component="img"
              sx={{ display: { sm: "none" } }}
            />
          </Link>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: -2, ml: "auto", display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* img logo */}
          <Link href="/">
            <Box
              src="/favicon.svg"
              alt="Logo icon"
              component="img"
              sx={{
                display: { xs: "none", sm: "block" }
              }}
            />
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" }, ml: "auto" }}>
            {navItems.map(item => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default header;
