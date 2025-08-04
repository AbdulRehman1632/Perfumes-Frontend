import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../utils/constant/Redux/Slice/productSlice';
import { useNavigate } from 'react-router';
import ParticlesBackground from '../../utils/constant/ParticlesBackground/ParticlesBackground';

const ProductComponents = () => {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector((state) => state.products);

  const [gender, setGender] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleGenderChange = (event, newGender) => {
    if (newGender !== null) setGender(newGender);
  };

  const handleSortChange = (e) => {
    setPriceSort(e.target.value);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const filteredProducts = [...(products || [])]
    .filter((item) => {
      const matchGender = gender ? item.PerfumeCategory?.toLowerCase() === gender : true;
      const matchSearch = item.PerfumeTitle?.toLowerCase().includes(search.toLowerCase());
      return matchGender && matchSearch;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.PerfumePrice);
      const priceB = parseFloat(b.PerfumePrice);
      if (priceSort === 'low') return priceA - priceB;
      if (priceSort === 'high') return priceB - priceA;
      return 0;
    });

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>

    <ParticlesBackground/>


    <Box p={3}>
      {/* Heading */}
      <Typography color='var(--theme-color)' variant="h4" textAlign="center" fontWeight="bold" mb={3}>
        Our Products
      </Typography>

      {/* Filters */}
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
        mb={4}
        sx={{ '& .MuiToggleButton-root:hover': { color: 'white' } }}
      >
        {/* Gender Filter */}
        <ToggleButtonGroup
          value={gender}
          exclusive
          onChange={handleGenderChange}
          aria-label="gender"
          sx={{
            '& .MuiToggleButton-root': {
              color: 'white',
              borderColor: 'white',
              '&.Mui-selected': {
                backgroundColor: 'white',
                color: 'black',
              },
              '&:hover': {
                color: 'white',
              },
            },
          }}
        >
          <ToggleButton value="">All</ToggleButton>
          <ToggleButton value="men">Men</ToggleButton>
          <ToggleButton value="women">Women</ToggleButton>
        </ToggleButtonGroup>

        {/* Price Sort */}
       <FormControl sx={{ minWidth: 150 }}>
  <InputLabel sx={{ color: 'white' }}>Sort by Price</InputLabel>
  <Select
    value={priceSort}
    onChange={handleSortChange}
    label="Sort by Price"
    sx={{
      backgroundColor: 'black',   // 👈 Background black
      color: 'white',             // 👈 Text white
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',     // 👈 Border white
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
      '& .MuiSvgIcon-root': {
        color: 'white',           // 👈 Dropdown arrow white
      },
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          backgroundColor: 'black', // 👈 Dropdown menu background black
          color: 'white',           // 👈 Dropdown item text white
        },
      },
    }}
  >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="low">Low to High</MenuItem>
            <MenuItem value="high">High to Low</MenuItem>
          </Select>
        </FormControl>

        {/* Search */}
        <TextField
          placeholder="Search by name..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: '250px',
            input: { color: 'white' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          }}
        />
      </Box>

      {/* Products Grid */}
      <Grid container spacing={8} justifyContent="center">
        {paginatedProducts.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={3}>
            <Card
  onClick={() => navigate(`/products/${item._id}`)}
  sx={{
    height: 400,
    background: 'linear-gradient(135deg, #302f2fff 0%, #111111ff 65%, #1a1a1aff 100%)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 8px 20px rgba(255, 255, 255, 0.2)',
    },
  }}
>

              <CardMedia
                component="img"
                image={item.PerfumePicture?.[0]}
                alt={item.PerfumeTitle}
                sx={{ height: 300, objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography textAlign="center" color='var(--theme-color)' variant="h6" fontWeight="bold">
                  {item.PerfumeTitle}
                </Typography>
                <Typography textAlign="center" variant="body2" color="white">
                  Rs {item.PerfumePrice} | {item.PerfumeBottleML}ml
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <Box mt={5} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
    </>
  );
};

export default ProductComponents;
