import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { content } from './AboutContent.js';

const AboutContent = () => {
  return (
    <Box sx={{ py: 6, px: 2, textAlign: 'center',backgroundSize: 'cover',
        backgroundPosition: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        color: '#fff',
        position: 'relative',
        background: '#a6a1a1',
background: "radial-gradient(circle,rgba(80, 80, 80, 0.36) 0%, rgba(0, 0, 0, 0.72) 44%, rgba(0, 0, 0, 1) 60%)", }}>
      {/* Main Heading */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4,color:"var(--theme-color)" }}>
        Why Choose Us
      </Typography>

      {/* 3 Columns - Always in 1 row */}
      <Grid container spacing={4} justifyContent="center">
        {content.map((item) => (
            
            
          <Grid sx={{
            width:{
                xs:"100%",
                md:"28%"
            }
          }} item xs={12} sm={4} md={4} key={item}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 , color:"gray"}}>
              {item.title}
            </Typography>
            <Typography variant="body1"  color="white" textAlign="left">
                {item.desc}
            </Typography>
          </Grid>
        ))}
      </Grid>

       <Grid container spacing={4} justifyContent="center">
            
          <Grid width="88%" item xs={12} sm={4} md={4} >
            
            <Typography variant="body1"  color="white" textAlign="left" marginTop="25px">
               Join us on this olfactory adventure as we celebrate the diverse tapestry of scents from around the world. Discover the captivating aromas that embrace the essence of local cultures and connect with the beauty of our shared humanity.
            </Typography>

            <Typography variant="body1"  color="white" textAlign="left" marginTop="25px">
             Thank you for being a part of our journey.
            </Typography>

            <Typography variant="body1"  color="white" textAlign="left" marginTop="25px">
               With love and gratitude, 

</Typography>
 <Typography variant="body1"  color="white" textAlign="left" >
               The Productist Team 
</Typography>

          </Grid>
      
      </Grid>
    </Box>
  );
};

export default AboutContent;
