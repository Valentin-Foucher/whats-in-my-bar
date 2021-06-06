import { ObjectID } from 'bson';
import { Document } from 'mongoose';

export interface IBookmark extends Document {
  item: ObjectID;
  type: string
};
