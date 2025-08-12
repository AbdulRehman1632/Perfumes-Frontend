import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PutReq } from '../../../api/axios';
import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AdminEditListingModal = ({ open, handleClose, data, onUpdated }) => {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState({
    mainImage: null,
    otherImage: null,
  });

  const [preview, setPreview] = useState({
    mainImage: '',
    otherImage: '',
  });

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 550,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
      setPreview({
        mainImage: data?.PerfumePicture?.[0] || '',
        otherImage: data?.PerfumePicture?.[1] || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    setImages({ ...images, [name]: file });
    setPreview({ ...preview, [name]: URL.createObjectURL(file) });
  };

  const handleUpdate = async () => {
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    if (images.mainImage) payload.append('images', images.mainImage);
    if (images.otherImage) payload.append('images', images.otherImage);

    try {
      await PutReq(`/Listing/edit/${data._id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      enqueueSnackbar('Listing updated successfully!', { variant: 'success' });
      onUpdated();
      handleClose();
    } catch (error) {
      console.error('Update failed:', error);
      enqueueSnackbar('Failed to update listing.', { variant: 'error' });
    }
  };

  const imageStyle = {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 4,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
         <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
      <Typography variant="h6">
        Edit Perfume Listing
      </Typography>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>

        <Grid container spacing={2}>
          {['PerfumeTitle', 'PerfumeCategory', 'PerfumePrice', 'PerfumeBottleML'].map((field) => (
            <Grid width="100%" item xs={12} key={field}>
              <TextField
                fullWidth
                label={field}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
              />
            </Grid>
          ))}

          <Grid width="100%" item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Perfume Description"
              name="PerfumeDescription"
              value={formData.PerfumeDescription || ''}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid width="100%" item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Perfume Detail"
              name="PerfumeDetail"
              value={formData.PerfumeDetail || ''}
              onChange={handleChange}
            />
          </Grid>

          {/* Main Image Upload */}
          <Grid item xs={12}>
            <Typography fontWeight="bold">Main Image</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              {preview.mainImage && (
                <img src={preview.mainImage} alt="main" style={imageStyle} />
              )}
              <Button variant="outlined" component="label">
                Change
                <input
                  type="file"
                  name="mainImage"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </Grid>

          {/* Other Image Upload */}
          <Grid item xs={12}>
            <Typography fontWeight="bold">Other Image</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              {preview.otherImage && (
                <img src={preview.otherImage} alt="other" style={imageStyle} />
              )}
              <Button variant="outlined" component="label">
                Change
                <input
                  type="file"
                  name="otherImage"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} textAlign="right">
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AdminEditListingModal;
