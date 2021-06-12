import { ObjectID } from 'bson';
import Cocktail from '../models/cocktails';
import { FilterQuery } from 'mongoose';
import { IngredientQuantity, ICocktail } from 'whats-in-my-bar';

module Cocktails {
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

    let ingredients = filters['ingredients'];
    let additionalQuery: Object = username ? { $or: [{ public: true }, { author: username }] } : { public: true };

    if (ingredients) {
      ingredients = (ingredients instanceof Array ? ingredients : [ingredients]);
      const subQuery = ingredients.map((ingredient: string) => ({ 'ingredients.id': { $in: [ingredient] } }));
      delete filters.ingredients;
      additionalQuery = { $and: [...subQuery, additionalQuery] };
    };

    return await Cocktail.find({ ...filters, ...additionalQuery}, null, { sort });
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