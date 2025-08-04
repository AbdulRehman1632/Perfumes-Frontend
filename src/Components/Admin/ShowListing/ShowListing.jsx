import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Modal,
  Pagination,
} from '@mui/material';
import { GetReq } from '../../../api/axios';
import AdminEditListingModal from '../../../utils/constant/AdminEditListingModal/AdminEditListingModal';
import { DeleteReq } from '../../../api/axios';
import { useSnackbar } from 'notistack';
import { TextField } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const ShowListing = () => {
  const [listings, setListings] = useState([]);
  console.log(listings)
  const [selectedListing, setSelectedListing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
const [deleteTarget, setDeleteTarget] = useState(null);
const [search, setSearch] = useState('');
const [filtered, setFiltered] = useState([]);

const [currentPage, setCurrentPage] = useState(1);
const listingsPerPage = 8;

const indexOfLast = currentPage * listingsPerPage;
const indexOfFirst = indexOfLast - listingsPerPage;
const currentListings = filtered.slice(indexOfFirst, indexOfLast);
const totalPages = Math.ceil(filtered.length / listingsPerPage);

const handlePageChange = (page) => {
  setCurrentPage(page);
};


const { enqueueSnackbar } = useSnackbar();

const confirmDelete = async () => {
  try {
    await DeleteReq(`/Listing/delete/${deleteTarget._id}`);
    enqueueSnackbar(`${deleteTarget.PerfumeTitle} deleted successfully!`, {
      variant: 'success',
    });
    setDeleteOpen(false);
    fetchListings(); // Refresh list
  } catch (error) {
    enqueueSnackbar('Failed to delete listing.', { variant: 'error' });
    console.error(error);
  }
};


  const fetchListings = async () => {
    try {
      const res = await GetReq('/Listing/all');
      setListings(res?.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
  const lower = search.toLowerCase();
  const filteredData = listings.filter((item) =>
    item.PerfumeTitle?.toLowerCase().includes(lower) ||
    item.PerfumeCategory?.toLowerCase().includes(lower) ||
    item.PerfumePrice?.toLowerCase().includes(lower) ||
    item._id?.toLowerCase().includes(lower)
  );
  setFiltered(filteredData);
}, [search, listings]);


const handleExport = () => {
  const excelData = listings.map((item) => ({
    Title: item.PerfumeTitle,
    Category: item.PerfumeCategory,
    Price: item.PerfumePrice,
    BottleML: item.PerfumeBottleML,
    SKU: item._id,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Perfumes');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'Perfume_Listings.xlsx');
};


  const handleEditClick = (listing) => {
    setSelectedListing(listing);
    setEditOpen(true);
  };

  const handleDeleteClick = (perfume) => {
  setDeleteTarget(perfume);
  setDeleteOpen(true);
};


  return (
    <>
    <Box sx={{display:"flex",justifyContent:"center"}}>
      <Button variant="contained" color="success" onClick={handleExport}>
    Export to Excel
  </Button>
  </Box>

    <Paper sx={{ p: 4, m: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        All Perfume Listings
      </Typography>

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
    placeholder="Search by name, category, price, SKU"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</Box>


      {filtered.map((perfume, index) => (
       <Box
  key={index}
  display="flex"
  alignItems="center"
  justifyContent="space-between"
  flexDirection={{ xs: 'column', sm: 'row' }}
  sx={{
    p: 2,
    border: '1px solid #ccc',
    borderRadius: 2,
    mb: 2,
    gap: 2,
  }}
>
  {/* Left Image */}
  <Avatar
    variant="rounded"
    src={perfume.PerfumePicture?.[0]}
    alt={perfume.PerfumeTitle}
    sx={{
      width: 80,
      height: 80,
      mr: { sm: 2 },
      alignSelf: { xs: 'center', sm: 'flex-start' },
    }}
  />

  {/* Center Info */}
  <Box
    sx={{
      flex: 1,
      textAlign: { xs: 'center', sm: 'left' },
    }}
  >
    <Typography fontWeight="bold">{perfume.PerfumeTitle}</Typography>
    <Typography color="text.secondary">
      Category: {perfume.PerfumeCategory}
    </Typography>
    <Typography color="text.secondary">
      Price: Rs {perfume.PerfumePrice} | {perfume.PerfumeBottleML}ml
    </Typography>
     <Typography color="text.secondary">
      SKU: {perfume._id}
    </Typography>
  </Box>

  {/* Right Buttons */}
  <Box
    sx={{
      display: 'flex',
      gap: 1,
      justifyContent: { xs: 'center', sm: 'flex-end' },
      width: { xs: '100%', sm: 'auto' },
    }}
  >
    <Button
      variant="outlined"
      color="primary"
      onClick={() => handleEditClick(perfume)}
      fullWidth={true}
    >
      Edit
    </Button>
    <Button
      variant="outlined"
      color="error"
      onClick={() => handleDeleteClick(perfume)}
      fullWidth={true}
    >
      Delete
    </Button>
  </Box>
</Box>
      ))}

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 24,
      p: 3,
    }}
  >
    <Typography variant="h6" mb={2}>
      Confirm Delete
    </Typography>
    <Typography mb={3}>
      Are you sure you want to delete{' '}
      <strong>{deleteTarget?.PerfumeTitle}</strong>?
    </Typography>
    <Box display="flex" justifyContent="flex-end" gap={2}>
      <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
      <Button variant="contained" color="error" onClick={confirmDelete}>
        Delete
      </Button>
    </Box>
  </Box>
</Modal>


      {/* Modal */}
      <AdminEditListingModal
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        data={selectedListing}
        onUpdated={fetchListings}
      />
    </Paper>

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

    </>
  );
};

export default ShowListing;
