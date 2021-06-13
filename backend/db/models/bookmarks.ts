import { model, Schema, Types } from 'mongoose';
import { IBookmark } from 'whats-in-my-bar';
import { ITEM_TYPES } from '../../helpers/constants';


export const BookmarkSchemaDefintion = {
  item: { type: Types.ObjectId, required: true },
  userId: { type: Types.ObjectId, required: true },
  type: { type: String, required: true, enum: ITEM_TYPES }
};

export default model<IBookmark>('Bookmark', new Schema(BookmarkSchemaDefintion), 'bookmarks');