import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { PostReq } from "../../api/axios";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    query: "",
    brief: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await PostReq("/contact/add", formData); 
    // Agar PostReq relative path use karta hai to "/contact/add"

    toast.success("Form Submitted Successfully");

    setFormData({
      name: "",
      number: "",
      email: "",
      query: "",
      brief: "",
    });
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "90%", sm: "80%", md: "50%", lg: "500px" },
          mx: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          background: "var(--bg-color)",
          borderRadius: 2,
          boxShadow: 3,
          color: "#fff",
          mt: { xs: 6, md: 10 },
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "#AB572D",
            textAlign: "center",
            fontWeight: "bold",
            letterSpacing: "0.9px",
          }}
        >
          Contact Us
        </Typography>

        {["name", "number", "email", "query", "brief"].map((field) => (
          <TextField
            key={field}
            fullWidth
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            margin="normal"
            required
            multiline={field === "brief"}
            rows={field === "brief" ? 4 : 1}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#AB572D" },
                "&:hover fieldset": { borderColor: "#AB572D" },
                "&.Mui-focused fieldset": { borderColor: "#AB572D" },
              },
            }}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#AB572D",
            "&:hover": { backgroundColor: "#b66b46ff" },
            color: "#fff",
            fontWeight: "bold",
          }}
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>

        <ToastContainer position="top-center" theme="dark" />
      </Box>

      {/* WhatsApp Section */}
      <Box
        textAlign="center"
        mt={4}
        px={2}
        sx={{ width: "100%", maxWidth: "600px", mx: "auto" }}
      >
        <Typography sx={{ color: "#ccc", mb: 1, fontSize: "1.2em", letterSpacing: "0.9px" }}>
          Need quick assistance? Chat with us directly on WhatsApp!
        </Typography>
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          sx={{
            backgroundColor: "#AB572D",
            "&:hover": { backgroundColor: "#b66b46ff" },
            color: "#fff",
            borderRadius: "30px",
            px: 3,
            py: 1,
            fontWeight: "bold",
            textTransform: "none",
            letterSpacing: "0.9px",
          }}
          onClick={() => window.open("https://wa.me/01234567", "_blank")}
        >
          Chat on WhatsApp
        </Button>
      </Box>
    </>
  );
}
