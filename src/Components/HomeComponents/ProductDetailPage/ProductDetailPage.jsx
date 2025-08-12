import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchProducts } from '../redux/productsSlice'; // Adjust path as needed
import {
  Box, Typography, Button, IconButton, Grid, Stack, Divider, CircularProgress,
  Pagination,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { fetchProducts } from '../../../utils/constant/Redux/Slice/productSlice';

import Rating from '@mui/material/Rating';
import { GetReq } from '../../../api/axios'; // your API helper
import ReviewModal from '../../../utils/constant/ReviewModal/ReviewModal';
import { addToCart } from '../../../utils/constant/Redux/Slice/cartslice';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: products, loading } = useSelector((state) => state.products);
  

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState([]);
  console.log(reviews)
const [openReviewModal, setOpenReviewModal] = useState(false);

 const [page, setPage] = useState(1);
  const cardsPerPage = 3;

  // Pagination logic
  const startIndex = (page - 1) * cardsPerPage;
  const paginatedReviews = reviews.slice(startIndex, startIndex + cardsPerPage);
  const pageCount = Math.ceil(reviews.length / cardsPerPage);



   const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: product._id,
      name: product.PerfumeTitle,
      price: product.PerfumePrice,
      image: selectedImage,
      quantity,
    }));

    setOpenSnackbar(true);
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };



const fetchReviews = async () => {
  try {
    const res = await GetReq("/Reviews/all");
    const data = res.data; // axios response (no need for res.json())
    const productReviews = data.data
      .filter((r) => r.ReviewProductID === id)
      .map((r) => ({
        ...r,
        ReviewImage: r.ReviewImage?.startsWith('http')
          ? r.ReviewImage
          : `http://localhost:5173/${r.ReviewImage}` // change base URL if needed
      }));
    setReviews(productReviews);
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
  }
};

useEffect(() => {
  fetchReviews();
}, [id]);


  // 🔁 Load products on first mount if not available
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // 🎯 Find product once products are loaded
  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find((p) => p._id === id);
      setProduct(found);
      if (found?.PerfumePicture?.length) {
        setSelectedImage(found.PerfumePicture[0]);
      }
    }
  }, [products, id]);

  // 🌀 Loading UI
  if (loading || !product) {
    return (
      <Box sx={{ color: 'white', p: 4, textAlign: 'center' }}>
        <CircularProgress sx={{ color: 'white' }} />
        <Typography mt={2}>Loading product...</Typography>
      </Box>
    );
  }

  // ✅ Render Product Page
  return (
    <Box sx={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', py: 6, px: { xs: 2, md: 30 } }}>
      <Grid container spacing={{ xs: 2, md: 30 }} alignItems="start">
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{
            width: '100%', height: { xs: 400, sm: 400, md: 500 },
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
          }}>
            <Box
        component="img"
        src={selectedImage}
        alt={product.PerfumeTitle}
        sx={{
          width: 'auto',
          maxWidth: '100%',
          height: '100%',
          objectFit: 'contain',
          marginLeft:{xs:5,md:0},
          
        }}
      />
    </Box>
          <Stack direction="row" spacing={2} mt={2} sx={{ overflowX: 'auto', pb: 1 }}>
            {product.PerfumePicture.map((img, idx) => (
              <Box key={idx} component="img" src={img} alt={`thumbnail-${idx}`}
                onClick={() => setSelectedImage(img)}
                sx={{
                  width: 70, height: 70, objectFit: 'cover', borderRadius: 1,
                  border: selectedImage === img ? '2px solid white' : '1px solid gray',
                  cursor: 'pointer', transition: '0.3s', flexShrink: 0,
                  '&:hover': { opacity: 0.8 },
                }}
              />
            ))}
          </Stack>
        </Grid>

        {/* Detail Section */}
        <Grid  item xs={12} md={6} sx={{ py: { xs: 0, md: 5 } ,width:{xs:"100%",md:"37%"} }}>
          <Typography sx={{
            textTransform: 'uppercase',color:"var(--theme-color)"
          }} variant="h3" fontWeight="bold" gutterBottom>
            {product.PerfumeTitle}
          </Typography>
          <Typography  sx={{py:{xs:0,md:2}}} variant="body1" mb={3}>
            {product.PerfumeDescription}
          </Typography>

          {/* <Divider sx={{ borderColor: '#444', mb: 3 }} /> */}

          
          <Typography fontSize={15}  mb={1}>Category : {product.PerfumeCategory.toUpperCase() }</Typography>
          <Typography fontSize={15} mb={1}>Bottle Size: {product.PerfumeBottleML} ML</Typography>
          <Typography color='var(--theme-color)' variant="h6" mb={1}>Rs {product.PerfumePrice}</Typography>
          {/* <Typography mb={3}>SKU: {product._id}</Typography> */}

          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <IconButton onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              sx={{ color: 'white', border: '1px solid gray' }}><RemoveIcon /></IconButton>
            <Typography variant="h6">{quantity}</Typography>
            <IconButton onClick={() => setQuantity((q) => q + 1)}
              sx={{ color: 'white', border: '1px solid gray' }}><AddIcon /></IconButton>
          </Stack>

           <>
      <Button
        variant="contained"
        size="large"
        sx={{ backgroundColor: "var(--theme-color)" }}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </>

        </Grid>
    
      </Grid>
      <Box mt={6} textAlign="center">
  <Typography variant="h4" fontWeight="bold" sx={{ textTransform: 'uppercase', mb: 2 }}>
    Product Detail
  </Typography>
  <Typography variant="body1"  mx="auto" sx={{ color: '#ccc' }}>
    {product.PerfumeDetail}
  </Typography>
</Box>

<Box mt={10}>
  <Typography variant="h4" fontWeight="bold" mb={3} sx={{ textTransform: 'uppercase',textAlign:"center" }}>
    Customer Reviews
  </Typography>

<Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
  <Button
    variant="outlined"
    onClick={() => setOpenReviewModal(true)}
    sx={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      color: 'white',
      borderColor: 'white',
      mb: 3,
      '&:hover': {
        borderColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.1)',
      },
    }}
  >
    Add a Review
  </Button>
  </Box>

  {reviews.length === 0 ? (
    <Typography>No reviews yet.</Typography>
  ) : (
  //    <Box sx={{ width: '100%', textAlign: 'center' }}>
  //     <Grid
  //       container
  //       spacing={4}
  //       justifyContent="center"
  //       alignItems="center"
  //       sx={{ mt: 2 }}
  //     >
  //       {paginatedReviews.map((review, idx) => (
  //         <Grid height="220px" width="30%" item key={idx} xs={12} sm={6} md={4} >
  //           <Box
  //             sx={{
  //               display: 'flex',
  //               alignItems: 'flex-start',
  //               gap: 2,
  //               backgroundColor: '#1e1e1e',
  //               p: 2,
  //               borderRadius: 2,
  //               height: '100%',
  //             }}
  //           >
  //             {/* Image (optional) */}
  //             {/* <Box
  //               component="img"
  //               src={review.ReviewImage}
  //               alt={review.ReviewName}
  //               sx={{
  //                 width: 60,
  //                 height: 60,
  //                 borderRadius: '50%',
  //                 objectFit: 'cover',
  //               }}
  //             /> */}

  //             <Box>
  //               <Box display="flex" alignItems="center" gap={1}>
  //                 <Typography fontWeight="bold">{review.ReviewName}</Typography>
  //               </Box>
  //               <Rating
  //                 value={review.ReviewRating}
  //                 readOnly
  //                 size="small"
  //                 sx={{ color: '#a4511b' }}
  //               />
  //               <Typography
  //                 variant="subtitle1"
  //                 sx={{ fontWeight: 500, color: 'var(--theme-color)' }}
  //               >
  //                 {review.ReviewTitle}
  //               </Typography>
  //               <Typography variant="body2" sx={{ color: '#ccc' }}>
  //                 {review.ReviewExperience}
  //               </Typography>
  //             </Box>
  //           </Box>
  //         </Grid>
  //       ))}
  //     </Grid>

  //     {/* Pagination Component */}
  //     <Box mt={4} display="flex" justifyContent="center">
  //       <Pagination
  //         count={pageCount}
  //         page={page}
  //         onChange={handlePageChange}
  //         sx={{
  //   "& .MuiPaginationItem-root": {
  //     color: "var(--theme-color)",
  //     borderColor: "var(--theme-color)",
  //   },
  //   "& .Mui-selected": {
  //     backgroundColor: "var(--theme-color)",
  //     color: "#fff",
  //   }
  // }}
  //       />
  //     </Box>
  //   </Box>


  <Box sx={{ width: '100%', textAlign: 'center' }}>
  <Grid
    container
    spacing={4}
    justifyContent="center"
    alignItems="center"
    sx={{ mt: 2 }}
  >
    {paginatedReviews.map((review, idx) => (
      <Grid sx={{ 
    width: {
      height:"220px",
      xs: '100%',     // mobile
      sm: '100%',   // tablet
      md: '30%'     // desktop
    }
  }} item key={idx} xs={12} sm={6} md={4}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            backgroundColor: '#1e1e1e',
            p: 2,
            borderRadius: 2,
            height: '100%',
          }}
        >
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontWeight="bold">{review.ReviewName}</Typography>
            </Box>
            <Rating
              value={review.ReviewRating}
              readOnly
              size="small"
              sx={{ color: '#a4511b' }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, color: 'var(--theme-color)' }}
            >
              {review.ReviewTitle}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              {review.ReviewExperience}
            </Typography>
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>

  {/* Pagination Component */}
  <Box mt={4} display="flex" justifyContent="center">
    <Pagination
      count={pageCount}
      page={page}
      onChange={handlePageChange}
    sx={{
    "& .MuiPaginationItem-root": {
      color: "var(--theme-color)",
      borderColor: "var(--theme-color)",
    },
    "& .Mui-selected": {
      backgroundColor: "var(--theme-color)",
      color: "#fff",
    }
  }}
    />
  </Box>
</Box>

  )}
</Box>
<ReviewModal
  open={openReviewModal}
  onClose={() => setOpenReviewModal(false)}
  onSuccess={fetchReviews}
  productId={product._id}
/>
    </Box>
  );
};

export default ProductDetailPage;
