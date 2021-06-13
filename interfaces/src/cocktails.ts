import { ObjectID } from 'bson';
import { Document } from 'mongoose';

export type IngredientQuantity = { id: ObjectID, quantity: string };

export interface ICocktail extends Document {
  name: string;
  glass_type: string;
  ingredients: Array<IngredientQuantity>;
  category: string;
  characteristics: { [key: string]: boolean };
  description?: string;
  author?: string;
  public?: boolean;
  popularity?: number; // computed
};
