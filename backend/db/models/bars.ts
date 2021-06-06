import { model, Schema, Types } from 'mongoose';
import { IBar } from 'whats-in-my-bar';


export const BarSchemaDefinion = {
  userId: { type: Types.ObjectId, required: true },
  name: { type: String, default: 'My Bar' },
  ingredients: { type: [Types.ObjectId], default: [] }
};

export default model<IBar>('Bar', new Schema(BarSchemaDefinion), 'bars');