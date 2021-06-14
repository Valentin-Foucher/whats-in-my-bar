import { Box, Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { IIngredient } from '../../../../interfaces/src/ingredients';
import { IMAGES_API_URL, uploadImage } from '../../api/images';
import { listIngredients } from '../../api/ingredients';


const useStyles = makeStyles({
  imageContainer: {
    width: 300,
    height: 300,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '10px 10px 50px 50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  input: {
    display: 'none'
  },
  ingredientCards: {
    borderRadius: 6
  }
});

export default function IngredientsList() {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState<IIngredient[]>();

  useEffect(() => {
    listIngredients().then((res) => {
      setIngredients(res.data.ingredients);
    });
  }, []);

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) uploadImage(e.target.files[0], e.target.getAttribute('referenceId') as string);
  };

  return (
    <Box>
      {ingredients ? (
        ingredients.map((ingredient: IIngredient, i: number) => {
          return <Box key={`${ingredient}-${i}`} display='flex' justifyContent='space-between'>
            <Box className={classes.ingredientCards}>
              <Box style={{ backgroundImage: `url(${IMAGES_API_URL}/${ingredient._id})` }} className={classes.imageContainer}>
                <Typography> {ingredient.name}</Typography>
                <Button variant='contained'>+  Add</Button>
              </Box>
            </Box>
            <input
              accept='image/*'
              className={classes.input}
              {...{referenceId:ingredient._id}}
              id={ingredient._id}
              type='file'
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleClick(e)}
            />
            <label htmlFor={ingredient._id}>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='span'>
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
        })
      ) : (
        <Typography> Loading data ... </Typography>
      )}
    </Box>
  );
}
