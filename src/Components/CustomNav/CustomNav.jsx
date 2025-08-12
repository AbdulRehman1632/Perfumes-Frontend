import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { NavLink } from "react-router-dom";
import AddToCartDrawer from "../AddToCart/AddToCart";
import { useSelector } from "react-redux";
import { GetReq, PostReq } from "../../api/axios";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomNav = () => {
  const statusColors = {
    Pending: "warning",
    Processing: "info",
    Shipped: "secondary",
    Delivered: "success",
    Cancelled: "error",
  };

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [emailValue, setEmailValue] = useState("");

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setOrders([]);
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const res = await PostReq("/Orders/get-order-by-email", {
        email: emailValue,
      });

      setOrders(res.data);
    } catch (err) {
      console.error("❌ Frontend fetch error:", err);
    }
    setLoading(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
  ];

  return (
    <>
      <AppBar
        sx={{ backgroundColor: "var(--bg-color)", color: "var(--font-color)" }}
        position="static"
        elevation={1}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography variant="h6" fontWeight="bold">
            Logo
          </Typography>

          {/* Desktop Links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#ffffffff" : "inherit",
                    fontWeight: isActive ? "bold" : "normal",
                    borderBottom: isActive
                      ? "2px solid var(--theme-color)"
                      : "none",
                  })}
                >
                  {link.name}
                </NavLink>
              ))}
            </Box>
          )}

          {/* Right-side Icons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleOpen}>
              <LocalShippingIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => setCartDrawerOpen(true)}>
              <Badge badgeContent={totalItems} color="error">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
            {isMobile && (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <AddToCartDrawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
      />

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          width={250}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem
                button
                key={link.name}
                component={NavLink}
                to={link.path}
              >
                <ListItemText primary={link.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "black", // sets background black
            color: "white", // text color white for visibility
            boxShadow:" rgba(255, 255, 255, 0.24) 0px 3px 8px;"
          },
        }}
      >
        <IconButton
          sx={{
            color: "var(--theme-color)",
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "var(--theme-color)",
          }}
        >
          Track Your Order
        </DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              sx={{
                marginTop: "10px",
                input: { color: "white" },
                label: {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white", // Prevents label from turning blue on focus
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
              label="Enter your email"
              fullWidth
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <Button
              sx={{
                backgroundColor: "var(--theme-color)",
                height: "40px",
                marginTop: "17px",
              }}
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Box>

        {orders.length > 0 ? (
  orders.map((order, index) => (
    <Box key={index} p={2} borderBottom="1px solid #ddd">
      <Typography fontWeight="bold">Products:</Typography>

      {order.products.map((product, pIndex) => (
        <Box key={pIndex} pl={2}>
          <Typography>• {product.productName}</Typography>
        </Box>
      ))}

      <Typography mt={1}>
        <strong>Total Price:</strong> Rs {order.totalAmount}
      </Typography>

      <Typography mt={1}>
        <strong>Date:</strong>{" "}
        {new Date(order.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </Typography>


       <Typography>
        <strong>Status:</strong>{" "}
        <Chip
          label={order.status}
          color={statusColors[order.status] || "default"}
          size="small"
          sx={{ textTransform: "capitalize" }}
        />
      </Typography>
    </Box>

    
  ))
) : (
  !loading && (
    <Typography variant="body2" color="text.secondary">
      No orders found.
    </Typography>
  )
)}


        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomNav;
