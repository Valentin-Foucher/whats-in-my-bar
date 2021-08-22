import { Box, Button, Dialog, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { COCKTAIL_CATEGORIES, COCKTAIL_CHARACTERISTICS, GLASS_TYPES } from '../../helpers/constants';

interface CocktailProps {
  name: string;
  glass_type: string;
  ingredients: Array<string>;
  category: string;
  characteristics: { [key: string]: boolean };
  description?: string;
  author?: string;
  public?: boolean;
  popularity?: number;
}

const useStyles = makeStyles({
  modal: {
    padding: 24,
  },
  input: {
    margin: 8,
    minWidth: 300
  }
})

export default function CocktailForm() {

  const classes = useStyles()
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [cocktailData, setCocktailData] = useState<CocktailProps>({ name: "", glass_type: '', ingredients: [''], category: '', characteristics: { '': false } })


  const handleClick = () => {
    setOpenForm(true)
  }
  const handleClose = () => {
    setOpenForm(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCocktailData({ ...cocktailData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e: any) => {
    setCocktailData({ ...cocktailData, [e.target.name]: e.target.value })

  console.log(cocktailData)
  }
  return (
    <Box>
      <Button variant='outlined' color='secondary' onClick={handleClick}> Add a new cocktail</Button>
      <Dialog open={openForm} onClose={handleClose} classes={{ paper: classes.modal }}>
        <Typography> Fill the information to create a cocktail :</Typography>
        <TextField variant="outlined"
          className={classes.input}
          label="Cocktail Name"
          required
          name="name"
          onChange={handleInputChange} />

        <FormControl className={classes.input}>
          <InputLabel>Glass type</InputLabel>
          <Select
            value={cocktailData.glass_type}
            required
            variant='outlined'
            onChange={handleSelect}
            name='glass_type'
            defaultValue=""
          >
            {GLASS_TYPES.map((cocktailGlassType: string, i: number) =>
              <MenuItem key={`glassType-${i}`} value={cocktailGlassType}>{cocktailGlassType}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel>Cocktail category</InputLabel>
          <Select
            value={cocktailData.category}
            required
            variant='outlined'
            onChange={handleSelect}
            name='category'
            defaultValue=""
          >
            {COCKTAIL_CATEGORIES.map((cocktailCategory: string, i: number) =>
              <MenuItem key={`glassType-${i}`} value={cocktailCategory}>{cocktailCategory}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel>Cocktail characteristics</InputLabel>
          <Select
            value={cocktailData.characteristics}
            required
            variant='outlined'
            //multiple
            onChange={handleSelect}
            name='characteristics'
            defaultValue=""
          >
            {COCKTAIL_CHARACTERISTICS.map((cocktailCharacteristics: string, i: number) =>
              <MenuItem key={`glassType-${i}`} value={cocktailCharacteristics}>{cocktailCharacteristics}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button> Save </Button>
      </Dialog>
    </Box>
  )
}