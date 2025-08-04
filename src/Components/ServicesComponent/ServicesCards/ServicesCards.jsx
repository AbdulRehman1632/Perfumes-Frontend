import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { servicesData } from './ServicesCard'
import ParticlesBackground from '../../../utils/constant/ParticlesBackground/ParticlesBackground'



const ServicesCards = () => {
      
  return (
    <><ParticlesBackground/>
    <Box sx={{ px: 2, py: 6 }}>
      {servicesData.map((item, index) => (
        <Grid
          container
          spacing={16}
          alignItems="center"
          direction={item.isrotate ? 'row' : 'row-reverse'}
          sx={{ mb: 10 }}
          key={index}
          justifyContent="center"
        >
          {/* Content */}
          <Grid sx={{
            width:{
                xs:"100%",
                md:"40%"
            }

          }} item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'var(--theme-color)', mb: 6 ,textAlign:{
                xs:"center",
                md:"left"
            } }}>
              {item.num}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 6,color:"var(--font-color)",textAlign:{
                xs:"center",
                md:"left"
            }  }}>
              {item.heading}
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--font-color)' }}>
              {item.para}
            </Typography>
            
          </Grid>

          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={item.image}
              alt={item.heading}
              sx={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius:"15px"
              }}
            />
          </Grid>
        </Grid>
      ))}

      <Grid container spacing={4} justifyContent="center">
                  
                <Grid width="85%" item xs={12} sm={4} md={4} >
                  
                  <Typography variant="body1"  color="white" textAlign="left" marginTop="25px">
At Local Face, our passion for perfumery drives us to go above and beyond to serve you better. We invite you to experience our exceptional services and indulge in the world of luxurious scents. Let us be your trusted fragrance destination, where your olfactory dreams come to life.                 
 </Typography>
      
                  <Typography variant="body1"  color="white" textAlign="left" marginTop="25px">
                   If you have any questions or need assistance, please do not hesitate to reach out to our friendly team. We're here to make your fragrance exploration a truly memorable one.
                  </Typography>
      
                  <Typography variant="body1"  color="white" textAlign="left" marginTop="25px">
                     The Productist Team 
      
      </Typography>
      
                </Grid>
            
            </Grid>
    </Box>
    </>
  )
}

export default ServicesCards
