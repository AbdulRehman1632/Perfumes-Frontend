import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../utils/constant/Redux/Slice/productSlice';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

const BestSelling = () => {
 const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector((state) => state.products);
  console.log(products)

  const navigate = useNavigate();

  useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);


  return (
    <Box p={3}>
      {/* Heading */}
      <Typography color='var(--theme-color)' variant="h4" textAlign="center" fontWeight="bold" mb={3}>
        Best Selling Products
      </Typography>


      <Grid container spacing={8} justifyContent="center">
              {products.slice(0, 5).map((item) => (
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
      </Box>
  )
}

export default BestSelling
