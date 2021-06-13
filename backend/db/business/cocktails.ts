import { ObjectID } from 'bson';
import { FilterQuery } from 'mongoose';
import { ICocktail, IngredientQuantity } from 'whats-in-my-bar';
import Bookmark from '../models/bookmarks';
import Cocktail from '../models/cocktails';
import { COCKTAIL } from './../../helpers/constants';

module Cocktails {
  const getIngredientsQuery = (filters?: { [key: string]: any }): Array<Object> => {
    let ingredients = filters['ingredients'];
    let ingredientsQuery: Array<Object>;
    if (ingredients) {
      ingredients = (ingredients instanceof Array ? ingredients : [ingredients]);
      ingredientsQuery = ingredients.map((ingredient: string) => ({ 'ingredients.id': { $in: [ingredient] } }));
      delete filters.ingredients;
    };
    return ingredientsQuery;
  };

  export const create = async (name: string, glass_type: string, ingredients: Array<IngredientQuantity>, category: string, author: string, characteristics?: { [key: string]: boolean }, description?: string): Promise<ICocktail> => {
    return await Cocktail.create({ name, glass_type, ingredients, category, author, characteristics, description });
  };

  export const list = async (username: string, filters?: { [key: string]: any }): Promise<Array<ICocktail>> => {
    let sort = filters['sort'];
    if (sort) {
      delete filters.sort;
    } else {
      sort = { name: 1 };
    };

    let additionalQuery: Object = username ? { $or: [{ public: true }, { author: username }] } : { public: true };
    const ingredientQuery = getIngredientsQuery(filters)
    if (ingredientQuery) {
      additionalQuery = { $and: [...ingredientQuery, additionalQuery] };
    };

    return await Cocktail.find({ ...filters, ...additionalQuery}, null, { sort });
  };

  export const listByPopularity = async (username: string, filters?: { [key: string]: any}): Promise<Array<ICocktail>> => {
    let additionalQuery: Object = username ? { $or: [{ public: true }, { author: username }] } : { public: true };
    const ingredientQuery = getIngredientsQuery(filters)
    if (ingredientQuery) {
      additionalQuery = { $and: [...ingredientQuery, additionalQuery] };
    };

    return await Bookmark.aggregate([
      { $match: { type: COCKTAIL } },
      { $sortByCount: '$item' },
      { $lookup: { from: 'cocktails', localField: '_id', foreignField: '_id', as: 'cocktail' } },
      { $unwind: '$cocktail' },
      { $addFields: { 'cocktail.popularity': '$count' } },
      { $project: { _id: false, count: false } },
      { $replaceRoot: { newRoot: '$cocktail' } },
      { $match: { ...filters, ...additionalQuery } }
    ]);
  };

  export const getById = async (id: ObjectID): Promise<ICocktail> => {
    return await Cocktail.findById(id);
  };

  export const getByName = async (name: string): Promise<ICocktail> => {
    return await Cocktail.findOne({ name });
  };

  export const exists = async (filter: FilterQuery<ICocktail>): Promise<Boolean> => {
    return await Cocktail.exists(filter);
  };

  export const drop = async () => {
    await Cocktail.deleteMany({});
  };
};

export default Cocktails;