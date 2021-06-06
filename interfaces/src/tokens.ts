import { ObjectID } from 'bson';
import { Document } from 'mongoose';

export interface IToken extends Document {
  userId: ObjectID;
  value: string;
};
