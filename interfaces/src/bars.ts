import { ObjectID } from 'bson';
import { Document } from 'mongoose';

export interface IBar extends Document {
  userId: ObjectID;
  name: string;
  ingredients: Array<ObjectID>;
};
