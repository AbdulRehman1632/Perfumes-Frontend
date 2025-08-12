import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { GetReq } from '../../../api/axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomCrudBanner = () => {
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      const res = await GetReq('/Offer/all');
      setOffers(res?.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false, // mobile-friendly
  };

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
            <Box
              key={index}
              sx={{
                background: `
                  radial-gradient(circle at 0% 10%, rgba(0, 0, 0, 1), transparent 100%),
                  radial-gradient(circle at 80% 60%, rgba(${BackgroundColor}), transparent 70%)
                `,
                backgroundColor: '#020f13ff',
                p: { xs: 2, md: 6 },
                display: 'flex',
                alignItems: 'center',
                minHeight: { xs: 350, md: 500 }
              }}
            >
              <Grid
                container
                spacing={4}
                direction={isImageLeft ? 'row' : 'row-reverse'}
                alignItems="center"
                justifyContent="center"
              >
                {/* Image */}
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                  <img
                    src={OfferImage}
                    alt={OfferProductName}
                    style={{
                      width: '100%',
                      maxWidth: '400px',
                      height: 'auto',
                      borderRadius: '12px',
                      objectFit: 'cover'
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
                  >
                    {`Limited Time Offer: ${OfferPercentage}% OFF on `}
                    <span style={{ color: `rgba(${BackgroundColor})` }}>
                      {OfferProductName}
                    </span>
                  </Typography>

                  <Typography
                    color="white"
                    variant="h4"
                    fontWeight="medium"
                    gutterBottom
                  >
                    {OfferProductName}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight="medium"
                    gutterBottom
                    sx={{ color: `rgba(${BackgroundColor})` }}
                  >
                    {OfferProductTagline}
                  </Typography>

                  <Typography
                    color="white"
                    variant="body1"                 
                    sx={{ mt: 2 ,fontSize:"1.1em",width: { xs: "100%", md: "70%" } }}
                  >
                    {OfferProductDescription}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Slider>
    </>
  );
};

export default CustomCrudBanner;
