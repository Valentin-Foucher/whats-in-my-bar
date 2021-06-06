import { ObjectID } from 'bson';
import { Request, Response } from 'express';
import ingredients from '../db/business/ingredients';
import { notFound, ok } from '../helpers/communication';
import { getFilters } from '../helpers/filters';
import { IngredientSchemaDefinition } from './../db/models/ingredients';


const getIngredient = async (req: Request, res: Response) => {
  const ingredient = await ingredients.getById(new ObjectID(req.params.id));

  if (!ingredient) {
    return notFound(res);
  };

  ok(res, { ingredient });
};


const listIngredients = async (req: Request, res: Response) => {
  const ingredientList = await ingredients.list(getFilters(req, IngredientSchemaDefinition));

  ok(res, { ingredients: ingredientList });
};

export { getIngredient, listIngredients };
