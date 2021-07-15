import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
  phrase: {
    margin: '25px 7%',
    fontStyle: 'italic',
    fontSize: '14px'
  }
});

export default function PreventionPhrase() {
  const classes = useStyles();
  return (
    <div className={classes.phrase}>
      Excessive drinking is dangerous for the health; alcoholic beverages should be
      consumed with moderation.
    </div>
  );
};
