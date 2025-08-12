import { Box, Typography } from '@mui/material'
import React from 'react'

const ServicesBanner = () => {
  return (
    <Box
      sx={{
        height: { xs: '300px', md: '500px' },
        backgroundImage: 'url(https://res.cloudinary.com/dpm8fa6gn/image/upload/v1754055589/Group_4_1_ms5vpn.png)',
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
          Our Services
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto' }}>
          At The Productist, we are dedicated to providing you with a delightful and immersive perfume shopping experience. Our services are tailored to ensure that you find the perfect fragrance that complements your unique personality and style. We take pride in offering a range of services that go beyond just selling perfumes, aiming to make your journey with us truly special.
        </Typography>
        
      </Box>
    </Box>

  )
}

export default ServicesBanner
