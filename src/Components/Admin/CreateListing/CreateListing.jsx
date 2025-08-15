import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { useSnackbar } from 'notistack'; // ✅ import snackbar
import { PostReq } from '../../../api/axios';

const CreateListing = () => {
  const { enqueueSnackbar } = useSnackbar(); // ✅ use hook

  const [formData, setFormData] = useState({
    PerfumeTitle: '',
    PerfumeCategory: '',
    PerfumeDescription: '',
    PerfumePrice: '',
    PerfumeBottleML: '',
    PerfumeDetail: '',
  });

  const [images, setImages] = useState({
    mainImage: null,
    otherImage: null,
  });

  const [imageNames, setImageNames] = useState({
    mainImage: '',
    otherImage: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages({ ...images, [name]: files[0] });
    setImageNames({ ...imageNames, [name]: files[0]?.name || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.PerfumeTitle ||
      !formData.PerfumeCategory ||
      !formData.PerfumeDescription ||
      !formData.PerfumePrice ||
      !formData.PerfumeBottleML ||
      !formData.PerfumeDetail ||
      !images.mainImage ||
      !images.otherImage
    ) {
      enqueueSnackbar('Please fill all required fields including images.', {
        variant: 'warning',
      });
      return;
    }

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    payload.append('images', images.mainImage);
    payload.append('images', images.otherImage);

    try {
  const res = await PostReq('/Listing/add', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  console.log('Success:', res.data);
  enqueueSnackbar('Perfume listed successfully!', { variant: 'success' });

  // ✅ Reset form fields after successful submission
  setFormData({
    PerfumeTitle: '',
    PerfumeCategory: '',
    PerfumeDescription: '',
    PerfumePrice: '',
    PerfumeBottleML: '',
    PerfumeDetail:'',
  });

  setImages({
    mainImage: null,
    otherImage: null,
  });

  setImageNames({
    mainImage: '',
    otherImage: '',
  });

} catch (err) {
  console.error('Error:', err);
  enqueueSnackbar('Something went wrong!', { variant: 'error' });
}

  };

  return (
    <Paper sx={{ maxWidth: 580, mx: 'auto', p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Create Perfume Listing
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid width="98%" item xs={12}>
            <TextField 
              fullWidth
              name="PerfumeTitle"
              label="Perfume Title"
              value={formData.PerfumeTitle}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid width="98%" item xs={12}>
            <TextField 
              fullWidth
              name="PerfumeCategory"
              label="Perfume Category"
              value={formData.PerfumeCategory}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid width="98%" item xs={12}>
            <TextField
              fullWidth
              name="PerfumePrice"
              label="Perfume Price"
              value={formData.PerfumePrice}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid width="98%" item xs={12}>
            <TextField
              fullWidth
              name="PerfumeBottleML"
              label="Bottle Size (ML)"
              value={formData.PerfumeBottleML}
              onChange={handleChange}
              required
            />
          </Grid>

            <Grid width="98%" item xs={12}>
            <TextField
              fullWidth
              name="PerfumeDescription"
              label="Perfume Description"
              value={formData.PerfumeDescription}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
          </Grid>


            <Grid width="98%" item xs={12}>
            <TextField
              fullWidth
              name="PerfumeDetail"
              label="Perfume Detail"
              value={formData.PerfumeDetail}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
          </Grid>

          {/* Main Image Upload */}
          <Grid width="98%" item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Main Image
            </Typography>
            <Button variant="outlined" component="label" fullWidth>
              Upload Main Image
              <input
                type="file"
                name="mainImage"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {imageNames.mainImage && (
              <Typography variant="caption" color="text.secondary">
                Selected: {imageNames.mainImage}
              </Typography>
            )}
          </Grid>

          {/* Other Image Upload */}
          <Grid width="98%" item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Other Image
            </Typography>
            <Button variant="outlined" component="label" fullWidth>
              Upload Other Image
              <input
                type="file"
                name="otherImage"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {imageNames.otherImage && (
              <Typography variant="caption" color="text.secondary">
                Selected: {imageNames.otherImage}
              </Typography>
            )}
          </Grid>

        <Grid item xs={12}>
  <Box display="flex" justifyContent="center" alignItems="center">
    <Button variant="contained" type="submit" sx={{ minWidth: 200 }}>
      Submit Listing
    </Button>
  </Box>
</Grid>


        </Grid>
      </Box>
    </Paper>
  );
};

export default CreateListing;
