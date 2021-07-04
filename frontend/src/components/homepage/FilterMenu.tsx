import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import colors from '../../styles/colors';

const useStyles = makeStyles({
  container: {
    maxWidth: 250,
    width: '100%',
    backgroundColor: 'white',
    height: 'calc(100vh)',
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    overflowY: 'auto',
    background: colors.gradient,
    boxShadow: '0px 8px 7px 3px #DF1448'
  },
  progress: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 20
  }
});

export default function FilterMenu(){
 const classes = useStyles()

  return(
    <Box className={classes.container}>
      <Typography className={classes.progress}> In progress 🛠️ </Typography>
    </Box>
    
  )
}