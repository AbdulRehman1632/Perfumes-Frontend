import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const OurValues = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 10 }, background: 'linear-gradient(135deg, #000000ff 0%, #000000ff 45%, #202020ff 100%)' }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        
      >
        {/* Left: Image */}
        <Grid item xs={12} md={6} textAlign="center">
          <Box
            component="img"
            src="../assets/images/ourValues.png" // ✅ Replace with actual path
            alt="Our Values"
            sx={{
              width: '100%',
              maxWidth: 500,
              height: 'auto',
              borderRadius: 2,
            }}
          />
        </Grid>

        {/* Right: Text */}
        <Grid item xs={12} md={6} sx={{width:{
            xs:"100%",
            md:"50%"
        }}}>
          <Typography sx={{textAlign:"center" ,color:"var(--font-color)"}} variant="h4" fontWeight="bold" gutterBottom>
            Our Values
          </Typography>
          <Typography sx={{fontSize:"1.1em",lineHeight:1.5,color:"var(--font-color)"}} variant="body1">
                    At Local Face, our perfume retail store is built on a foundation of passion and authenticity. We believe in celebrating the individuality of every customer, providing a diverse collection of scents that resonate with their unique personality and style. Our dedicated team of fragrance enthusiasts is committed to creating a welcoming and inclusive environment, where connections are forged, and inspiration thrives. 
          </Typography>

          <Typography  sx={{fontSize:"1.1em",lineHeight:1.5,marginTop:"15px",color:"var(--font-color)"}}  variant='body1'>
                    Embracing sustainability and continuous learning, Local Face strives to be more than just a shopping destination; we are a community that inspires and empowers individuals on their fragrance journey.

          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OurValues;
