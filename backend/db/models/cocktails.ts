import { model, Schema, Types } from 'mongoose';
import { ICocktail } from 'whats-in-my-bar';
import { COCKTAIL_CATEGORIES, GLASS_TYPES } from '../../helpers/constants';

export const CocktailSchemaDefinition = {
  name: { type: String, unique: true, required: true },
  glass_type: { type: String, required: true, enum: GLASS_TYPES },
  ingredients: { type: [{ id: Types.ObjectId, quantity: String }], required: true },
  category: { type: String, required: true, enum: COCKTAIL_CATEGORIES },
  characteristics: { type: Map, of: String, default: {}},
  description: { type: String, required: false },
  author: { type: String, required: false },
  public: { type: Boolean, default: false }
};

export default model<ICocktail>('Cocktail', new Schema(CocktailSchemaDefinition), 'cocktails');