import { model, Schema } from 'mongoose';
import { IIngredient } from 'whats-in-my-bar';
import { INGREDIENT_CATEGORIES } from '../../helpers/constants';


export const IngredientSchemaDefinition = {
  name: { type: String, required: true },
  category: { type: String, required: true, enum: INGREDIENT_CATEGORIES }
};

export default model<IIngredient>('Ingredient', new Schema(IngredientSchemaDefinition), 'ingredients');