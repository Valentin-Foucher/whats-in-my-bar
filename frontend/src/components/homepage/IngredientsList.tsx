import React, { useState, useEffect, ChangeEvent } from "react";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { listIngredients } from "../../api/ingredients";
import { uploadImage, retrieveImage } from "../../api/images";
import { IIngredient } from "../../../../interfaces/src/ingredients";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
});

export default function IngredientsList() {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState<IIngredient[]>();

  useEffect(() => {
    listIngredients().then((res) => {
      setIngredients(res.data.ingredients);
    });
  }, []);

  const handleClick = (e: ChangeEvent<HTMLInputElement>, i: IIngredient) => {
    if (e.target && e.target.files) uploadImage(e.target.files[0], i._id);
  };
  return (
    <Box>
      {ingredients ? (
        ingredients.map(async (i: IIngredient) => {
          const test = await retrieveImage(i._id);
          console.log(test);
          return (
            <Box display="flex" justifyContent="space-between">
              <Typography> {i.name}</Typography>
              //<Box> {test} </Box>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleClick(e, i)
                }
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span">
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
