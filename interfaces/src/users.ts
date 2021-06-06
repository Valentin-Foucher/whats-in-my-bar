import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
};

export const UserSchemaDefinition = {
  username: { type: String, unique: true, required: true, minLength: 8, maxLength: 64 } ,
  password: { type: String, required: true },
  email: { type: String, required: true, match: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$") }
};

export default model<IUser>('User', new Schema(UserSchemaDefinition, { timestamps: true }), 'users');

