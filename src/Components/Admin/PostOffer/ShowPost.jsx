import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
  Pagination,
  MenuItem,
} from '@mui/material';
import { GetReq, DeleteReq, PutReq } from '../../../api/axios';
import { useSnackbar } from 'notistack';

const ShowPost = () => {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
const [editData, setEditData] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const fetchOffers = async () => {
    try {
      const res = await GetReq('/Offer/all');
      setOffers(res?.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch offers:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDeleteClick = (offer) => {
    setDeleteTarget(offer);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await DeleteReq(`/Offer/delete/${deleteTarget._id}`);
      enqueueSnackbar('Offer deleted successfully!', { variant: 'success' });
      setDeleteOpen(false);
      fetchOffers();
    } catch (error) {
      enqueueSnackbar('Failed to delete offer.', { variant: 'error' });
    }
  };


  const handleEditClick = (offer) => {
  setEditData(offer);
  setEditOpen(true);
};

const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditData((prev) => ({ ...prev, [name]: value }));
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    await PutReq(`/Offer/edit/${editData._id}`, editData); // <-- update this endpoint if different
    enqueueSnackbar('Offer updated successfully!', { variant: 'success' });
    setEditOpen(false);
    fetchOffers();
  } catch (error) {
    console.error(error);
    enqueueSnackbar('Failed to update offer.', { variant: 'error' });
  }
};


  const handlePageChange = (page) => setCurrentPage(page);

  const filtered = offers.filter((offer) =>
    offer.OfferProductName?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filtered.length / perPage);


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

  return  (
  <Paper sx={{ p: { xs: 2, sm: 4 }, m: 2 }}>
    <Typography variant="h5" gutterBottom align="center">
      All Offers Posted
    </Typography>

    {/* 🔍 Search Bar */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 3,
        justifyContent: 'space-between',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by product name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Box>

    {/* 🔁 Offers List */}
    {paginated.map((offer, index) => (
      <Box
        key={index}
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        // alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        sx={{
          p: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          mb: 2,
          gap: 2,
        }}
      >
        {/* 🖼 Image */}
        <Avatar
          variant="rounded"
          src={offer.OfferImage}
          alt={offer.OfferProductName}
          sx={{
            width: { xs: 60, sm: 80 },
            height: { xs: 60, sm: 80 },
            mr: { sm: 2 },
            alignSelf: { xs: 'center', sm: 'flex-start' },
          }}
        />

        {/* ℹ Info */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography fontWeight="bold">{offer.OfferProductName}</Typography>
          <Typography color="text.secondary">
            Tagline: {offer.OfferProductTagline}
          </Typography>
          <Typography color="text.secondary">
            {offer.OfferPercentage}% OFF
          </Typography>
           <Box>
    <Typography
      color="text.secondary"
      mt={1}
      sx={{
        wordBreak: 'break-word', // Prevent overflow
        whiteSpace: 'pre-wrap',  // Handle line breaks
      }}
    >
      {offer.OfferProductDescription}
    </Typography>
  </Box>
        </Box>

        {/* 🎯 Actions */}
        <Box
          sx={{
          //  display:"flex",
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
            width: { xs: '100%', sm: 'auto' },
            mt: { xs: 2, sm: 0 },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
             sx={{
              marginTop:"10px"
            }}
            onClick={() => handleEditClick(offer)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            fullWidth
            sx={{
              marginTop:"10px"
            }}
            onClick={() => handleDeleteClick(offer)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    ))}

    {/* ❌ Delete Confirmation Modal */}
    <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography variant="h6" mb={2}>Confirm Delete</Typography>
        <Typography mb={3}>
          Are you sure you want to delete{' '}
          <strong>{deleteTarget?.OfferProductName}</strong>?
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>

    {/* 🛠 Edit Modal */}
    <Modal open={editOpen} onClose={() => setEditOpen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>Edit Offer</Typography>
        <Box
          component="form"
          onSubmit={handleEditSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Product Name"
            name="OfferProductName"
            value={editData?.OfferProductName || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            select
            label="Tagline"
            name="OfferProductTagline"
            value={editData?.OfferProductTagline || ''}
            onChange={handleEditChange}
            fullWidth
          >
            {taglines.map((tagline, index) => (
              <MenuItem key={index} value={tagline}>
                {tagline}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Background Color"
            name="BackgroundColor"
            value={editData?.BackgroundColor || ''}
            onChange={handleEditChange}
            fullWidth
          >
            {colorOptions.map((color, index) => (
              <MenuItem key={index} value={color.value}>
                {color.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Percentage"
            name="OfferPercentage"
            type="number"
            value={editData?.OfferPercentage || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="OfferProductDescription"
            value={editData?.OfferProductDescription || ''}
            onChange={handleEditChange}
            multiline
            rows={3}
            fullWidth
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button variant="contained" type="submit" color="primary">
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>

    {/* 🔢 Pagination */}
    {totalPages > 1 && (
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => handlePageChange(page)}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
              borderColor: 'white',
            },
          }}
        />
      </Box>
    )}
  </Paper>
);
};

export default ShowPost;
