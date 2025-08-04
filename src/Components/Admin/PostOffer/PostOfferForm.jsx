import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  InputLabel,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { PostReq } from '../../../api/axios';
import { enqueueSnackbar, useSnackbar } from 'notistack';

const taglines = [
  'Embrace the Calm Within',
  'Fragrance that Breathes Serenity',
  'Awaken to a World of Stillness',
  'Let Peace Define You',
  'Soft, Subtle, Serene',
  'A Whisper of Timeless Grace',
  'Where Calm Meets Confidence',
  'Refresh Your Soul',
  'Elegance in Every Essence',
  'The Art of Subtle Presence',
  'A Moment of Pure Escape',
  'Simplicity. Serenity. Sophistication.',
  'A Fragrance That Feels Like You',
];

// 🎨 20 color options (RGBA only)
const colorOptions = [
  { name: 'Sky Blue', value: '135,206,235' },
  { name: 'Sea Green', value: '46,139,87' },
  { name: 'Slate Gray', value: '112,128,144' },
  { name: 'Royal Purple', value: '120,81,169' },
  { name: 'Blush Pink', value: '255,192,203' },
  { name: 'Forest Green', value: '34,139,34' },
  { name: 'Coral Red', value: '240,128,128' },
  { name: 'Deep Sky Blue', value: '0,191,255' },
  { name: 'Goldenrod', value: '218,165,32' },
  { name: 'Turquoise', value: '64,224,208' },
  { name: 'Periwinkle', value: '204,204,255' },
  { name: 'Lavender', value: '230,230,250' },
  { name: 'Mint Green', value: '152,255,152' },
  { name: 'Crimson', value: '220,20,60' },
  { name: 'Peach', value: '255,218,185' },
  { name: 'Indigo', value: '75,0,130' },
  { name: 'Teal', value: '0,128,128' },
  { name: 'Chocolate', value: '210,105,30' },
  { name: 'Light Cyan', value: '224,255,255' },
];

const PostOfferForm = () => {
  const [formData, setFormData] = useState({
    OfferProductName: '',
    OfferPercentage: '',
    OfferProductDescription: '',
    OfferProductTagline: '',
    BackgroundColor: '',
    OfferImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      OfferImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await PostReq('/Offer/add', data,{
         
    headers: { 'Content-Type': 'multipart/form-data' },

      });
      console.log('Success:', res.data);
        enqueueSnackbar('Offer posted successfully!', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Failed to post offer.', { variant: 'error' });
    }
  };

  const gradientStyle = formData.BackgroundColor
    ? {
        background: `radial-gradient(circle at 80% 60%, rgba(${formData.BackgroundColor}, 0.15), transparent 70%)`,
        transition: 'background 0.4s ease',
      }
    : {};

  return (

    <Paper sx={{ maxWidth: 580, mx: 'auto',  mt: 4 }}>
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        p: 3,
        // border: '1px solid #ccc',
        borderRadius: 2,
        ...gradientStyle,
      }}
    >

        <Typography variant="h5" gutterBottom align="center">
            Post New Offer
          </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid width="100%"  item xs={12}>
            <TextField
              label="Product Name"
              name="OfferProductName"
              fullWidth
              required
              value={formData.OfferProductName}
              onChange={handleChange}
            />
          </Grid>
          <Grid width="100%" item xs={12}>
            <TextField
              label="Percentage Off"
              name="OfferPercentage"
               type="number"
               inputProps={{ min: 0, max: 99 }}
              fullWidth
              required
              value={formData.OfferPercentage}
              onChange={handleChange}
            />
          </Grid>
         
          <Grid width="100%" item xs={12}>
            <TextField
            sx={{
                width:"100%"
            }}
              select
              label="Tagline"
              name="OfferProductTagline"
              required
              value={formData.OfferProductTagline}
              onChange={handleChange}
            >
              {taglines.map((tagline, index) => (
                <MenuItem key={index} value={tagline}>
                  {tagline}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid width="100%" item xs={12}>
            <TextField
              select
              label="Select Background Shade"
              name="BackgroundColor"
              fullWidth
              required
              value={formData.BackgroundColor}
              onChange={handleChange}
            >
              {colorOptions.map((color) => (
                <MenuItem key={color.name} value={color.value}>
                  {color.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

           <Grid width="100%" item xs={12}>
            <TextField
              label="Description"
              name="OfferProductDescription"
              multiline
              rows={4}
              fullWidth
              required
              value={formData.OfferProductDescription}
              onChange={handleChange}
              helperText="Max 30 words"
              inputProps={{
                onBlur: () => {
                  const words = formData.OfferProductDescription.trim().split(/\s+/);
                  if (words.length > 30) {
                    alert('Only 60 words allowed in description.');
                  }
                },
              }}
            />
          </Grid>
          <Grid width="100%" item xs={12}>
            <InputLabel>Upload Offer Product Image</InputLabel>
            <input
              type="file"
              name="OfferImage"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </Grid>
          <Grid item xs={12} justifyContent='center'>
            <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Button type="submit" variant="contained" >
              Submit Offer
            </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
    </Paper>
  );
};

export default PostOfferForm;
