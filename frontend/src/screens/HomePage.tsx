import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import PreventionPhrase from '../components/general/PreventionPhrase';
import FilterMenu from '../components/homepage/FilterMenu';
import HomeBox from '../components/homepage/HomeBox';
import Introduction from '../components/homepage/Introduction';
import Navbar from '../components/homepage/Navbar';



const useStyles = makeStyles({
  title: {
    padding: '5rem 0 4rem',
    fontFamily: 'Limelight',
    textAlign: 'center',
  },
  connexionButton: {
    float: 'right',
    margin: '2rem 4rem 0',
    padding: '.5rem',
  },
});


export default function HomePage() {
  const classes = useStyles();

  return (
      <Box>
        <Typography variant={'h1'} className={classes.title}> What's in my bar ? </Typography>
        <Introduction />
        <Navbar />
        <Box display='flex'>
        <FilterMenu />
        <HomeBox />
      </Box>
      <PreventionPhrase />
    </Box>
  );
};