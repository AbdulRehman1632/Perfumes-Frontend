import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../utils/constant/Redux/Slice/cartslice';
import { useNavigate } from 'react-router';

const AddToCartDrawer = ({ open, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const delivery = 200;
  const total = subtotal + delivery;

  return (
    <Drawer   PaperProps={{
          sx: {
            backgroundColor: "black", // sets background black
            color: "white", // text color white for visibility
            boxShadow:" rgba(255, 255, 255, 0.24) 0px 3px 8px;"
          },
        }} anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, p: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton sx={{
            color:"white"
          }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <Typography mt={2}>Cart is empty</Typography>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <Box sx={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding:"20px",  
                borderRadius:"5px"
            }}
                key={index}
                display="flex"
                alignItems="center"
                mt={2}
                borderBottom="1px solid #ccc"
                pb={1}
                gap={2}
              >
                <Avatar
                  src={item.image}
                  alt={item.name}
                  variant="square"
                  sx={{ width: 66, height: 72 }}
                />
                <Box flexGrow={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Typography variant="body2">Price: Rs {item.price}</Typography>
                </Box>
                <IconButton onClick={() => dispatch(removeFromCart(item._id))}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            {/* Order Summary */}
            <Divider sx={{ my: 2 }} />
            <Box sx={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding:"20px",
                borderRadius:"5px"
            }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Order Summary
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography>Subtotal</Typography>
                <Typography fontWeight={600} color='green'>Rs {subtotal}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography>Delivery</Typography>
                <Typography fontWeight={600} color='green'>Rs {delivery}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography fontWeight={600}>Total</Typography>
                <Typography fontWeight={600} color='green'>Rs {total}</Typography>
              </Box>
              <Box  sx={{display:"flex" ,justifyContent:"center" ,border:"2px solid black",marginTop:"30px",borderRadius:"5px"}}>
                <Button color='black'  onClick={() => navigate("/checkout")}>Go To Checkout</Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default AddToCartDrawer;
