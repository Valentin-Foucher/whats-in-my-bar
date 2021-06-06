import Cocktail from '../models/cocktails';
import { FilterQuery } from 'mongoose';
import { IngredientQuantity, ICocktail } from 'whats-in-my-bar';
module Cocktails {
  export const create = async (name: string, glass_type: string, ingredients: Array<IngredientQuantity>, category: string, author: string, characteristics?: { [key: string]: boolean }, description?: string): Promise<ICocktail> => {
    return await Cocktail.create({ name, glass_type, ingredients, category, author, characteristics, description });
  };

  export const list = async (username: string, filters?: { [key: string]: any }): Promise<Array<ICocktail>> => {
    const additionalQuery = username ? { '$or': [{ public: true }, { author: username }] } : { public: true };
    const query = { ...filters, ...additionalQuery};

    return await Cocktail.find(query, null, { sort: { name: 1 } });
  };

  export const getById = async (id: string): Promise<ICocktail> => {
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