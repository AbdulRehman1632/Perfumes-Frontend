import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';

const MainBanner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 0 },
        background: 'linear-gradient(135deg, #131313ff 0%, #000000ff 65%, #000000 100%)',
      }}
    >
      {/* BUBBLES */}
      {[...Array(20)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            bottom: -50,
            left: `${Math.random() * 100}%`,
            width: 15,         // Equal width and height
        height: 15,
            backgroundColor: 'var(--theme-color)',
            borderRadius: '50%',
            animation: `rise ${5 + Math.random() * 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left: Text */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ lineHeight: 1.2, color: 'var(--font-color)' }}
          >
            Elevate Your Spirit with Victory Scented Fragrances!
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: 'var(--font-color)', fontSize: '1.1em' }}
          >
            Shop now and embrace the sweet smell of victory with Local Face.
          </Typography>
          <Button
            sx={{ background: 'var(--button-color)' }}
            variant="contained"
            color="primary"
            size="large"
          >
            Shop Now
          </Button>
        </Grid>

        {/* Right: Image */}
        <Grid item xs={12} md={6} textAlign="center">
          <Box
            component="img"
            src="../assets/images/MainBannerImg.png"
            alt="Banner"
            sx={{
              width: { xs: '60%', sm: '50%', md: '70%' },
              maxWidth: 500,
              height: 'auto',
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>

      {/* Bubble Animation Keyframes */}
      <style>
        {`
          @keyframes rise {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0.6;
            }
            100% {
              transform: translateY(-100vh) scale(1.5);
              opacity: 0;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default MainBanner;


// AB572D