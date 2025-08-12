import React from 'react'
import { collection } from './OurCollection.js'
import { Box, Card, CardMedia, Grid, Typography } from '@mui/material'
import { keyframes } from '@emotion/react'

const rise = keyframes`
  0% { transform: translateY(0); opacity: 0.8; }
  100% { transform: translateY(-600px); opacity: 0; }
`

const OurCollection = () => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', py: 6 }}>
      {/* Bubbles in background */}
      {[...Array(40)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            bottom: -50,
            left: `${Math.random() * 100}%`,
            width: 15,
            height: 15,
            backgroundColor: 'var(--theme-color)',
            borderRadius: '50%',
            opacity: 0.6,
            animation: `${rise} ${5 + Math.random() * 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            zIndex: 0
          }}
        />
      ))}

      {/* Heading */}
      <Typography
        color="var(--theme-color)"
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={3}
        sx={{ position: 'relative', zIndex: 1 }}
      >
        Our Collection
      </Typography>

      {/* Row 1: Two Items */}
      <Grid container spacing={6} justifyContent="center" mb={2} sx={{ position: 'relative', zIndex: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="300" image={collection[0].image} alt={collection[0].text} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="300" image={collection[1].image} alt={collection[1].text} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="300" image={collection[2].image} alt={collection[2].text} />
          </Card>
        </Grid>
      </Grid>

      {/* Row 2: 3 Columns */}
      <Grid container spacing={8} justifyContent="center" mb={2} sx={{ position: 'relative', zIndex: 1,marginTop:"50px" }}>
        {collection.slice(3, 7).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardMedia component="img" height="300" image={item.image} alt={item.text} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default OurCollection
