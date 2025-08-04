import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import PostOfferForm from './PostOfferForm';
import ShowPost from './ShowPost'; // Assume you have this component

const PostOffer = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Post Offer
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Post Offer" />
        <Tab label="Show Post" />
      </Tabs>

      <Box sx={{ mt: 4, px: 2 }}>
        {tabIndex === 0 && <PostOfferForm />}
        {tabIndex === 1 && <ShowPost />}
      </Box>
    </Box>
  );
};

export default PostOffer;
