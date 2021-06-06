import { model, Schema, Types } from 'mongoose';
import { IToken } from 'whats-in-my-bar';


export const TokenSchemaDefinition = {
  userId: { type: Types.ObjectId, required: true },
  value: { type: String, required: true }
};

export default model<IToken>('Token', new Schema(TokenSchemaDefinition, { timestamps: true }), 'tokens');