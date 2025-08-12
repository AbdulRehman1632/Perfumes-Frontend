import React from 'react';
import { Box, Typography } from '@mui/material';
import ParticlesBackground from '../../../utils/constant/ParticlesBackground/ParticlesBackground';

const AboutMainBanner = () => {
  return (
    <>
    <Box
      sx={{
        height: { xs: '300px', md: '500px' },
        backgroundImage: 'url(https://res.cloudinary.com/dpm8fa6gn/image/upload/v1753969792/Group_4_up9n5d.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* Optional overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1
        }}
      />

      {/* Content */}
      <Box sx={{ zIndex: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2,color:"var(--theme-color)" }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto' }}>
          At The Productist, we believe that perfumes are more than just scents; they are expressions of one's individuality and style. Our passion for exquisite fragrances led us to curate a collection that captures the essence of diverse personalities, bringing you an unparalleled olfactory experience.
        </Typography>
      </Box>
    </Box>


  <Box
      sx={{
        height: { xs: '300px', md: '500px' },
       
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        color: '#fff',
        position: 'relative',
        background: '#a6a1a1',
background: "radial-gradient(circle,rgba(80, 80, 80, 1) 0%, rgba(0, 0, 0, 0.72) 44%, rgba(0, 0, 0, 1) 60%)",
      }}
    >
      {/* Optional overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1
        }}
      />
      <ParticlesBackground/>

      {/* Content */}
      <Box sx={{ zIndex: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2,color:"var(--theme-color)" }}>
          Our Story
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto' }}>
          The Productist Perfumes was founded by a group of perfume enthusiasts with a shared vision to create a haven for perfume lovers seeking authentic, locally-inspired fragrances. Inspired by the diversity and richness of cultures around the world, we set out on a journey to curate a collection of scents that capture the essence of each region. Our aim is to bring you closer to the heart and soul of different cultures through the art of perfumery.
        </Typography>
      </Box>
    </Box>


     <Box
      sx={{
        height: { xs: '300px', md: '500px' },
        backgroundImage: 'url(https://res.cloudinary.com/dpm8fa6gn/image/upload/v1753970752/jay-huang-TUUY5yORBc0-unsplash_1_lxraiz.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        color: '#fff',
        position: 'relative',
        marginTop:"20px"
      }}
    ></Box>
    </>
  );
};

export default AboutMainBanner;
