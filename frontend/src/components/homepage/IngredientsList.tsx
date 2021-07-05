import { Box, Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { CancelOutlined, CheckCircleOutline, PhotoCamera } from '@material-ui/icons';
import clsx from 'clsx';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IIngredient } from '../../../../interfaces/src/ingredients';
import { IMAGES_API_URL, uploadImage } from '../../api/images';
import { listIngredients } from '../../api/ingredients';
import colors from '../../styles/colors';


const SCROLL_SIZE = 15;

const useStyles = makeStyles({
  imageContainer: {
    width: 200,
    height: 200,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '4px 4px 0 0',
    boxShadow: '-1px 4px 4px 0px rgba(0,0,0,0.1)'
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
    '&:active': {
      backgroundColor: colors.green
    },
  },
  removeButton: {
    '&:active': {
      backgroundColor: colors.red
    },
  },
  ingredientName: {
    background: colors.gradient,
    padding: 4,
    marginLeft: 4,
    borderRadius: 6,
    fontWeight: 700,
    color: '#fff',
    textTransform: 'capitalize',
    fontSize: 14,
    boxShadow: '-1px 4px 4px 0px rgba(0,0,0,0.1)',
  }
});

export default function IngredientsList() {
  const classes = useStyles();
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
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

  const getNextIngredients = () => {
    if (ingredients) {
      const newCursor = cursor + SCROLL_SIZE;
      setVisibleIngredients(ingredients.slice(0, newCursor));
      setCursor(newCursor);
    };
  };

  const handleAddPicture = (e: ChangeEvent<HTMLInputElement>, ingredientId: string) => {
    if (e.target && e.target.files) uploadImage(e.target.files[0], ingredientId);
  };

  const handleAddIngredient = (e: any, ingredientId: string) => {
    setAddedIngredients([...addedIngredients, ingredientId]);
  };

  const handleRemoveIngredient = (e: any, ingredientId: string) => {
    setAddedIngredients(addedIngredients.filter(ingredient => ingredient !== ingredientId));
  };

  const handleClickIngredient = (e: MouseEvent<HTMLButtonElement>, ingredientId: string) => {
    addedIngredients.includes(ingredientId) ? handleRemoveIngredient(e, ingredientId) : handleAddIngredient(e, ingredientId);
  };

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
                  <Typography className={classes.ingredientName}> {ingredient.name}</Typography>
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
              <Button variant='contained'
              endIcon={addedIngredients.includes(ingredient._id) ? <CancelOutlined /> : <CheckCircleOutline /> }
                disableRipple
                onClick={(e: MouseEvent<HTMLButtonElement>) =>
                  handleClickIngredient(e, ingredient._id)}
                className={clsx(classes.addButton, {[classes.removeButton]: addedIngredients.includes(ingredient._id)})}>
                  {addedIngredients.includes(ingredient._id) ? 'Remove' : 'Add'}
              </Button>
              <input
                accept='image/*'
                className={classes.input}
                id={ingredient._id}
                type='file'
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleAddPicture(e, ingredient._id)}
              />
            </Box>
          </Box>
        })) : <Typography> Loading data ... </Typography>}
        </Box>
    </InfiniteScroll>
  );
}
