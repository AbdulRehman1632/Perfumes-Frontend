import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { GetReq } from '../../../api/axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loader from '../Loader/Loader';


const CustomCrudBanner = () => {
  const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await GetReq('/Offer/all');
      setOffers(res?.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // ek dabbe me ek card
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
      arrows: false
  };

   if (loading) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <>
      <Typography
        color="white"
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={3}
        sx={{ position: 'relative', zIndex: 1 }}
      >
        Special Offers
      </Typography>

      <Slider {...settings}>
        {offers.map((item, index) => {
          const isImageLeft = index % 2 === 0;
          const {
            OfferImage,
            OfferPercentage,
            OfferProductDescription,
            OfferProductName,
            OfferProductTagline,
            BackgroundColor
          } = item;

          return (
            <div key={index}>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: `
                    radial-gradient(circle at 0% 10%, rgba(0, 0, 0, 1), transparent 100%),
                    radial-gradient(circle at 80% 60%, rgba(${BackgroundColor}), transparent 70%)
                  `,
                  backgroundColor: '#020f13ff',
                  p: { xs: 2, md: 4 },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 400
                }}
              >
                <Grid container spacing={{xs:2,md:12}} direction={isImageLeft ? 'row' : 'row-reverse'} alignItems="center">
                  {/* Image */}
                   <Grid item xs={12} md={6} display="flex" justifyContent="center">
    <Box
      component="img"
      src={OfferImage}
      alt="Banner Visual"
      sx={{
        width: { xs: '80%', sm: '80%', md: '100%' },
        height: { xs: 'auto', md: '300px' },
        borderRadius: '12px',
        objectFit: 'cover',
      }}
    />
  </Grid>


                  {/* Text */}
                  <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                      color="white"
                      variant="h4"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ width: { xs: '100%', md: '70%' }, mx: { xs: 'auto', md: 0 } }}
                    >
                      {`Limited Time Offer: ${OfferPercentage}% OFF on `}
                      <span style={{ color: `rgba(${BackgroundColor})` }}>{`${OfferProductName} Perfume`}</span>
                    </Typography>

                    <Typography
                      color="white"
                      variant="h5"
                      fontWeight="medium"
                      gutterBottom
                      sx={{ mt: 4 }}
                    >
                      {OfferProductName}
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="medium"
                      gutterBottom
                      sx={{ mt: -1, color: `rgba(${BackgroundColor})` }}
                    >
                      {OfferProductTagline}
                    </Typography>

                    <Typography
                      color="white"
                      variant="body1"
                      sx={{ mt: 4 , width:{
                        xs:"100%" , md : "70%"
                      } }}
                    >
                      {OfferProductDescription}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default CustomCrudBanner;
