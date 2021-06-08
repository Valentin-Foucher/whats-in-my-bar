import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { IIngredient } from '../../../../interfaces/src/ingredients';
import { retrieveImage, uploadImage } from '../../api/images';
import { listIngredients } from '../../api/ingredients';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

export default function IngredientsList() {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState<IIngredient[]>();
  const [ingredientImages, setIngredientImages] = useState<any[]>();

  useEffect(() => {
    listIngredients().then((res) => {
      setIngredients(res.data.ingredients);
    });
  }, []);

  useEffect(() => {
    (async function updateImages() {

      if (ingredients) {
        debugger
        console.log(await retrieveImage(ingredients[0]._id));
        const test = await Promise.all(ingredients.map(async (i: IIngredient) => await retrieveImage(i._id)));
        setIngredientImages(test)
      };
    })()}, [ingredients]);

  const handleClick = (e: ChangeEvent<HTMLInputElement>, i: IIngredient) => {
    if (e.target && e.target.files) uploadImage(e.target.files[0], i._id);
  };

  console.log(ingredientImages)

  return (
    <Box>
      {ingredients ? (
        ingredients.map((ingredient: IIngredient, i: number) => {
          return (
            <Box key={`${ingredient}-${i}`} display='flex' justifyContent='space-between'>
              <Typography> {ingredient.name}</Typography>
              <Box>  </Box>
              <input
                accept='image/*'
                className={classes.input}
                id='icon-button-file'
                type='file'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleClick(e, ingredient)
                }
              />
              <label htmlFor='icon-button-file'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'>
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
          );
        })
      ) : (
        <Typography> Uh oh</Typography>
      )}
    </Box>
  );
}
