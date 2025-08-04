import React from 'react';
import { Box, Typography } from '@mui/material';

const WelcomeNote = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        backgroundImage: `url('../assets/images/welcomeNoteImg.png')`, // ✅ apna image path yahan do
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        px: 2,
      }}
    >
      {/* Overlay for opacity */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.74)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
        <Typography sx={{color:"var(--button-color)"}} variant="h3" fontWeight="bold" gutterBottom>
          Welcome to The Productist
        </Typography>
        <Typography variant="body1">
Welcome to The Productist Perfumes, where the spirit of victory and triumph come alive through scents that empower and inspire. Our curated collection, aptly named "Victory Scented," is a celebration of success and elegance, designed to unleash your victorious essence. Indulge in the sweet taste of triumph with captivating fragrances that tell the tale of your achievements. At The Productist, we believe that every victory deserves a signature scent, and we are dedicated to providing unforgettable fragrances that elevate your spirit and empower your journey.
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeNote;
