import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { GetReq } from '../../../api/axios';

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
              position: 'relative',
              overflow: 'hidden',
              background: `
                radial-gradient(circle at 0% 10%, rgba(0, 0, 0, 1), transparent 100%),
                radial-gradient(circle at 80% 60%, rgba(${BackgroundColor}), transparent 70%)
              `,
              backgroundColor: '#020f13ff',
              p: { xs: 2, md: 4 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4
            }}
          >
            <Grid sx={{ marginLeft: { xs: '0px', md: '220px' } }} container spacing={2} direction={isImageLeft ? 'row' : 'row-reverse'} alignItems="center">
              {/* Image */}
              <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <img
                  src={OfferImage}
                  alt="Banner Visual"
                  style={{ width: '80%', maxWidth: '400px', borderRadius: '12px' }}
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
                  sx={{ mt: 4, width: { xs: '100%', md: '70%' }, mx: { xs: 'auto', md: 0 } }}
                >
                  {OfferProductName}
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight="medium"
                  gutterBottom
                  sx={{ mt: -1, color: `rgba(${BackgroundColor})`, width: { xs: '100%', md: '70%' }, mx: { xs: 'auto', md: 0 } }}
                >
                  {OfferProductTagline}
                </Typography>

                <Typography
                  color="white"
                  variant="body1"
                  sx={{ mt: 4, width: { xs: '100%', md: '70%' }, mx: { xs: 'auto', md: 0 } }}
                >
                  {OfferProductDescription}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};

export default CustomCrudBanner;
