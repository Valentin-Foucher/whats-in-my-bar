import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ConnectModal from '../../components/homepage/ConnectModal';
import HomeBox from '../../components/homepage/HomeBox';



const useStyles = makeStyles({
  title:{
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


export default function HomePage () {
  const classes = useStyles();
  const [openConnect, setOpenConnect] = useState<boolean>(false);

  const handleClick = () => {
    setOpenConnect(true)
  };

  const handleCloseModal = () => {
    setOpenConnect(false)
  };

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleClick} className={classes.connexionButton}> Connect</Button>
      <ConnectModal open={openConnect} onClose={handleCloseModal}/>
      <Typography variant={'h1'} className={classes.title}> What's in my bar ? </Typography>
      <HomeBox />
    </>
  );
};