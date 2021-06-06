import { ObjectID } from 'bson';
import { Document, model, Schema, Types } from 'mongoose';

export interface IToken extends Document {
  userId: ObjectID;
  value: string;
};

export const TokenSchemaDefinition = {
  userId: { type: Types.ObjectId, required: true },
  value: { type: String, required: true }
};

export default model<IToken>('Token', new Schema(TokenSchemaDefinition, { timestamps: true }), 'tokens');