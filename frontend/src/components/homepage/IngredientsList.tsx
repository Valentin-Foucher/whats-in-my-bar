import { Box, Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IIngredient } from '../../../../interfaces/src/ingredients';
import { IMAGES_API_URL, uploadImage } from '../../api/images';
import { listIngredients } from '../../api/ingredients';


const SCROLL_SIZE = 15;

const useStyles = makeStyles({
  imageContainer: {
    width: 200,
    height: 200,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',

  },
  input: {
    display: 'none'
  },
  ingredientCards: {
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  infiniteScroll: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  addButton: {
    fontWeight: 600,
  },
});

export default function IngredientsList() {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState<IIngredient[]>();
  const [visibleIngredients, setVisibleIngredients] = useState<IIngredient[]>();
  const [cursor, setCursor] = useState<number>(0);

  useEffect(() => {
    listIngredients().then((res) => {
      setIngredients(res.data.ingredients);
    });
  }, []);

  useEffect(() => {
    getNextIngredients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  const handleClick = (e: ChangeEvent<HTMLInputElement>, ingredientId: string) => {
    if (e.target && e.target.files) uploadImage(e.target.files[0], ingredientId);
  };

  const getNextIngredients = () => {
    if (ingredients) {
      const newCursor = cursor + SCROLL_SIZE;
      setVisibleIngredients(ingredients.slice(0, newCursor));
      setCursor(newCursor);
    }
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={getNextIngredients}
      hasMore={ingredients ? cursor < ingredients.length : false}
      className={classes.infiniteScroll}
  >
    <Box display='flex' flexWrap='wrap'>
      {visibleIngredients ? (
        visibleIngredients.map((ingredient: IIngredient, i: number) => {
          return <Box key={`${ingredient}-${i}`} display='flex' justifyContent='space-between' margin={2}>
            <Box className={classes.ingredientCards}>
              <Box
                style={{ backgroundImage: `url(${IMAGES_API_URL}/${ingredient._id})` }} className={classes.imageContainer}>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography> {ingredient.name}</Typography>
                  <label htmlFor={ingredient._id}>
                    <IconButton
                      color='primary'
                      aria-label='upload picture'
                      component='span'>
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Box>
              </Box>
                <Button variant='contained' className={classes.addButton}>+  Add</Button>
              <input
                accept='image/*'
                className={classes.input}
                id={ingredient._id}
                type='file'
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleClick(e, ingredient._id)}
              />
            </Box>
          </Box>
        })) : <Typography> Loading data ... </Typography>}
        </Box>
    </InfiniteScroll>
  );
}
