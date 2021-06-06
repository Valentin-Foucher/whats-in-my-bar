import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ICocktail } from 'whats-in-my-bar';
import bars from '../db/business/bars';
import cocktails from '../db/business/cocktails';
import users from '../db/business/users';
import { notFound, ok, unprocessableEntity } from '../helpers/communication';
import { getFilters } from '../helpers/filters';
import { CocktailSchemaDefinition } from './../db/models/cocktails';

const createCocktail = async (req: Request, res: Response) => {
  const { name, glass_type, ingredients, category, author, characteristics, description } = req.body;
  let cocktail = null;

  try {
    cocktail = await cocktails.create(
      name,
      glass_type,
      ingredients.map((obj: { id: string, quantity: string }) => ({ quantity: obj.quantity, id: Types.ObjectId(obj.id)})),
      category,
      author,
      characteristics,
      description
    );
  } catch (err) {
    return unprocessableEntity(res, err.message);
  };

  ok(res, { id: cocktail.id });
};

const getCocktail = async (req: Request, res: Response) => {
  const cocktail = await cocktails.getById(req.params.id);

  if (!cocktail) {
    return notFound(res);
  };

  ok(res, { cocktail });
};


const listCocktails = async (req: Request, res: Response) => {
  let username = null;
  if (req.userId) {
    username = (await users.findById(req.userId)).username
  };

  const cocktailList = await cocktails.list(username, getFilters(req, CocktailSchemaDefinition, ['public']));

  ok(res, { cocktails: cocktailList });
};

const getCocktailsFromBar = async (req: Request, res: Response) => {
  let ingredients: Array<string>;
  let username: string;

  if (req.userId) {
    const bar = await bars.getByUserId(req.userId);
    if (!bar) {
      return notFound(res);
    };

    ingredients = bar.ingredients.map(ingredient => ingredient.toString());
    username = (await users.findById(req.userId)).username;
  } else {
    ingredients = req.body.ingredients;
    username = '';
  };

  if (!ingredients) {
    return ok(res, {});
  };

  const allCocktailList = await cocktails.list(username, getFilters(req, CocktailSchemaDefinition, ['public']))

  const withMissingIngredients = [];
  const cocktailList = [];

  allCocktailList.forEach((cocktail: ICocktail) => {
    let missingIngredientsCount = 0;

    cocktail.ingredients.forEach((ingredient) =>  {
      if (ingredients.indexOf(ingredient.id.toString()) === -1) {
        ++missingIngredientsCount;
      };
    });

    if (missingIngredientsCount === 0) {
      cocktailList.push(cocktail);
    } else if (missingIngredientsCount === 1) {
      withMissingIngredients.push(cocktail);
    };
  });

  ok(res, { cocktails: cocktailList, withMissingIngredients });
}

export { createCocktail, getCocktail, listCocktails, getCocktailsFromBar };
