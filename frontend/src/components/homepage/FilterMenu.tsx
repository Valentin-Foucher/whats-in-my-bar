import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  container: {
    maxWidth: 250,
    width: "100%",
    backgroundColor: "white",
    height: "calc(100vh)",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    background: 'linear-gradient(45deg, #DF1448, rgba(244, 106, 38, 0.4)',
    boxShadow: '1px 8px 7px 3px #DF1448'
  },
});

export default function FilterMenu(){
 const classes = useStyles()

  return(
    <Box className={classes.container}>
      <Typography > In progress </Typography>
    </Box>
    
  )
}