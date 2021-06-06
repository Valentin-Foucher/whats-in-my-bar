import { ObjectID } from 'bson';
import { IIngredient } from 'whats-in-my-bar';
import Ingredient from '../models/ingredients';

module Ingredients {
  export const create = async (name: string, category: string): Promise<IIngredient> => {
    return await Ingredient.create({ name, category });
  };

  export const list = async (filters?: { [key: string]: any }): Promise<Array<IIngredient>> => {
    return await Ingredient.find({ ...filters });
  };

  export const getById = async (id: ObjectID): Promise<IIngredient> => {
    return await Ingredient.findById(id);
  };

  export const getByName = async (name: string): Promise<IIngredient> => {
    return await Ingredient.findOne({ name });
  };

  export const drop = async () => {
    await Ingredient.deleteMany({});
  };
};

export default Ingredients;