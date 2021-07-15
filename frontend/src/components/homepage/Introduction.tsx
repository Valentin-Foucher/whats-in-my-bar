
import { makeStyles } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles({
  introduction: {
    padding: '2rem 2rem 2rem',
  }
});

export default function Introduction() {
  const classes = useStyles();

  return (
    <div className={classes.introduction}>
      <p>
        Welcome to What's In My Bar! Try out our cocktail builder and check out our articles!
      </p>
      <p>
        Whether that you are a cocktail enthusiastic or a professional mixologist, I am sure you will
        find your happiness here 😄
      </p>
      <p>
        Cheers!
      </p>
    </div>
  );
}
