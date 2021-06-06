import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { listIngredients } from "../../api/ingredients";

export default function IngredientsList() {
  const [ingredients, setIngredients] = useState<any>();

  useEffect(() => {
    listIngredients().then((res) => {
      setIngredients(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Box>
      {ingredients ? (
        ingredients.map((i) => (
          <Box display="flex" justifyContent="space-between">
            <Typography> {i.name}</Typography>
            <input
              accept="image/*"
              //className={classes.input}
              id="add-ingredient-picture"
              type="file"
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
        ))
      ) : (
        <Typography> Uh oh</Typography>
      )}
    </Box>
  );
}
