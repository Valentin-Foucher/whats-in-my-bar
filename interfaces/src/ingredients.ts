import { Document } from 'mongoose';


export interface IIngredient extends Document {
  _id: string;
  name: string;
  category?: string;
};
