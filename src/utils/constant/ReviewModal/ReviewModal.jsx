import {
  Modal, Box, Typography, TextField, Button, MenuItem,
  Stack, Rating, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { PostReq } from "../../../api/axios";

const genders = ["Male", "Female", "Other"];
const ageGroups = ["Below 18", "18-34", "35-54", "55+"];

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

const MAX_EXPERIENCE_LENGTH = 230;


export default function ReviewModal({ open, onClose, onSuccess, productId }) {


  const [form, setForm] = useState({
    ReviewName: "",
    ReviewEmail: "",
    ReviewTitle: "",
    ReviewExperience: "",
    ReviewGender: "",
    ReviewAge: "",
  });
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

 const handleChange = (e) => {
  const { name, value } = e.target;

  // Limit experience characters
  if (name === "ReviewExperience" && value.length > MAX_EXPERIENCE_LENGTH) {
    return;
  }

  setForm({ ...form, [name]: value });
};


  const handleSubmit = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    // data.append("ReviewImage", image);
    data.append("ReviewRating", rating);
    data.append("ReviewProductID", productId);

    try {
      setLoading(true);
      await PostReq("/Reviews/add", data);
      setLoading(false);
      onSuccess(); // Refresh review list
      onClose();

      // Reset form
      setForm({
        ReviewName: "",
        ReviewEmail: "",
        ReviewTitle: "",
        ReviewExperience: "",
        ReviewGender: "",
        ReviewAge: "",
      });
      setRating(5);
      setImage(null);
    } catch (err) {
      console.error("Error submitting review:", err);
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
        p: 4,
        borderRadius: 2,
        maxWidth: 500,
        mx: "auto",
        mt: "10%",
        boxShadow: 24
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" color="var(--theme-color)">Add a Review</Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}><CloseIcon /></IconButton>
        </Stack>

        <TextField
          label="Your Name"
          name="ReviewName"
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2, ...whiteTextFieldStyle }}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="ReviewEmail"
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2, ...whiteTextFieldStyle }}
          onChange={handleChange}
        />
        <TextField
          label="Review Title"
          name="ReviewTitle"
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2, ...whiteTextFieldStyle }}
          onChange={handleChange}
        />
       <TextField
  label="Experience"
  name="ReviewExperience"
  multiline
  rows={3}
  fullWidth
  variant="outlined"
  size="small"
  sx={{ mb: 2, ...whiteTextFieldStyle }}
  onChange={handleChange}
  value={form.ReviewExperience}
  helperText={`${form.ReviewExperience.length}/${MAX_EXPERIENCE_LENGTH} characters`}
  FormHelperTextProps={{
    sx: { color: 'red' } // 🔴 Red helper text
  }}
  inputProps={{ maxLength: MAX_EXPERIENCE_LENGTH }}
/>


        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            select
            label="Gender"
            name="ReviewGender"
            value={form.ReviewGender}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={whiteTextFieldStyle}
          >
            {genders.map((g) => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Age"
            name="ReviewAge"
            value={form.ReviewAge}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={whiteTextFieldStyle}
          >
            {ageGroups.map((a) => (
              <MenuItem key={a} value={a}>{a}</MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography>Rating:</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            sx={{ color: "#a4511b" }}
          />
        </Stack>

        {/* <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{
            mb: 1,
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Upload Image
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>

        {image && (
          <>
            <Box
              component="img"
              src={URL.createObjectURL(image)}
              alt="Preview"
              sx={{
                width: "30%",
                height: 80,
                objectFit: "cover",
                borderRadius: 2,
                mb: 1,
                border: "1px solid white"
              }}
            />
            <Typography variant="body2" sx={{ color: "white", mb: 2 }}>
              {image.name}
            </Typography>
          </>
        )} */}

        <Button
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={handleSubmit}
          sx={{ backgroundColor: "var(--theme-color)" }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </Box>
    </Modal>
  );
}

