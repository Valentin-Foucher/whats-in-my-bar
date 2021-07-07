import { Box } from '@material-ui/core';
import React from 'react'
import Footer from '../components/general/Footer';
import PreventionPhrase from '../components/general/PreventionPhrase';
import FilterMenu from '../components/homepage/FilterMenu';
import HomeBox from '../components/homepage/HomeBox';
import Introduction from '../components/homepage/Introduction';
import Navbar from '../components/general/Navbar';

export default function HomePage() {

  return (
    <Box>
      <Navbar />
      <Introduction  />
      <Box display='flex'>
        <FilterMenu />
        <HomeBox />
      </Box>
      <PreventionPhrase />
      <Footer />
    </Box>
  );
};
