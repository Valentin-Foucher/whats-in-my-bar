import colors from '../../styles/colors';
import { Box, Checkbox, makeStyles, Select, InputLabel, FormControl, Typography, MenuItem } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { COCKTAIL_CATEGORIES, GLASS_TYPES } from '../../helpers/constants';


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
  const [category, setCategory] = useState<string>();
  const [glassType, setGlassType] = useState<string>();
  const [characteristics, setCharacteristics] = useState<{[key: string]: boolean}>({
    sweet: false,
    bitter: false,
    sour: false,
    dry: false,
    smooth: false,
    spirituous: false,
    refreshing: false,
    fuity: false,
    creamy: false,
    smokey: false,
    herbal: false,
    floral: false,
  });

  const changeCategory = (event: ChangeEvent<{name?: string}>) => {
    setCategory(event.target.name);
  };

  const toggleCharacteristic = (event: ChangeEvent<HTMLInputElement>) => {
    setCharacteristics({ ...characteristics, [event.target.name]: event.target.checked });
  };

  const changeGlassType = (event: ChangeEvent<{name?: string}>) => {
    setGlassType(event.target.name);
  };

  return(
    <Box className={classes.container}>
      <FormGroup>
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={changeCategory}
            defaultValue=""
          >
            {COCKTAIL_CATEGORIES.map((cocktailCategory: string, i: number) =>
              <MenuItem key={`category-${i}`} value={cocktailCategory}>{cocktailCategory}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Glass type</InputLabel>
          <Select
            value={glassType}
            onChange={changeGlassType}
            defaultValue=""
          >
            {GLASS_TYPES.map((cocktailGlassType: string, i: number) =>
              <MenuItem key={`glassType-${i}`} value={cocktailGlassType}>{cocktailGlassType}</MenuItem>
            )}
          </Select>
        </FormControl>
        {Object.entries(characteristics).map(([characteristic, checked]) =>
          <FormControlLabel
            control={
              <Checkbox
                onChange={toggleCharacteristic}
                name={characteristic}
                checked={checked}
              />
            }
            key={`characteristic-${characteristic}`}
            label={characteristic}
          />
        )}
      </FormGroup>
      <Typography className={classes.progress}> In progress 🛠️ </Typography>
    </Box>
  )
}