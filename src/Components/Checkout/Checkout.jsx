import React from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { GetReq, PostReq } from '../../api/axios';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);

  console.log(cartItems)


  const whiteTextFieldStyle = {
  '& label': { color: 'white' },
  '& label.Mui-focused': { color: 'white' },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: 'white' },
    '&:hover fieldset': { borderColor: 'white' },
    '&.Mui-focused fieldset': { borderColor: 'white' },
  },
};

  const [form, setForm] = React.useState({
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // const handleSubmit = async () => {
  //   const orderData = {
  //     name: "Guest",
  //     email: form.email,
  //     phone: form.phone,
  //     shippingAddress: form.address,
  //     totalAmount: total,
  //     products: cartItems.map(item => ({
  //       productId: item._id,
  //       productName: item.name,
  //       quantity: item.quantity
  //     }))
  //   };

  //   const res = await PostReq("/Orders/add", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(orderData)
  //   });

  //   if (res.status === 200) {
  //     alert("Order Placed Successfully!");
  //     localStorage.removeItem("cartItems");
  //     window.location.href = "/";
  //   } else {
  //     alert("Failed to place order.");
  //   }
  // };

  const handleSubmit = async () => {
  const orderData = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    shippingAddress: form.address,
    totalAmount: total,
    products: cartItems.map(item => ({
      productId: item._id,
      productName: item.name,
      quantity: item.quantity
    }))
  };



  try {
    const res = await PostReq("/Orders/add", orderData);
    if (res.status === 200) {
      alert("Order Placed Successfully!");
      localStorage.removeItem("cartItems");
      window.location.href = "/";
    }
  } catch (err) {
    console.error("❌ Order Submit Error:", err.response?.data || err.message);
    alert("Failed to place order.");
  }
};


  return (
    <Box
      sx={{
        marginTop:"50px",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "#1c1c1c",
          p: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Typography color='white' variant="h4" mb={3} align="center">Checkout</Typography>

        {cartItems.map(item => (
          <Box key={item._id} mb={1}>
            <Typography sx={{textAlign:"center",color:"white",fontSize:"1.2em"}}>{item.name} x {item.quantity} = Rs. {item.price * item.quantity}</Typography>
          </Box>
        ))}

        <Typography sx={{textAlign:"center",color:"white",fontSize:"1.2em"}} fontWeight="bold" my={2}>Total: Rs. {total}</Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="normal"
          sx={{ mb: 2, ...whiteTextFieldStyle }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
          sx={{ mb: 2, ...whiteTextFieldStyle }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          margin="normal"
          sx={{ mb: 2, ...whiteTextFieldStyle }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          fullWidth
          label="Shipping Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          margin="normal"
          sx={{ mb: 2, ...whiteTextFieldStyle }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, backgroundColor: "var(--theme-color)" }}
          onClick={handleSubmit}
        >
          Place Order
        </Button>
      </Paper>
    </Box>
  );
};

export default Checkout;
