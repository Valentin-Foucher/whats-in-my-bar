import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../helpers/validators';
import { COCKTAIL_CATEGORIES, GLASS_TYPES } from '../../helpers/constants';


function createCocktailSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string().required(),
    glass_type: Joi.string().valid(...GLASS_TYPES).required(),
    ingredients: Joi.array().items(Joi.object({id: Joi.string(), quantity: Joi.string()})).min(1).required(),
    category: Joi.string().valid(...COCKTAIL_CATEGORIES).required(),
    author: Joi.string(),
    characteristics: Joi.object(),
    description: Joi.string()
  });
  validateRequest(req, next, schema);
};

function getCocktailFromIngredientsSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
      ingredients: Joi.array().items(Joi.string())
  });
  validateRequest(req, next, schema);
};

export { createCocktailSchema, getCocktailFromIngredientsSchema };