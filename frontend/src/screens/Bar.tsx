import React from 'react'
import { Box, makeStyles, ThemeProvider } from '@material-ui/core';
import Footer from '../components/general/Footer';
import Navbar from '../components/general/Navbar';
import theme from '../styles/theme';

const useStyles = makeStyles({
  container: {
    minHeight: '87vh'
  },
});

export default function Bar() {
  const classes = useStyles();

  return (
  <ThemeProvider theme={theme}>
    <Box>
      <Navbar />
      <Box className={classes.container}>
        Bar
      </Box>
      <Footer />
    </Box>
  </ThemeProvider>
  );
};
