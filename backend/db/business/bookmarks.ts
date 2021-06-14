import { ObjectID } from 'bson';
import { IBookmark } from 'whats-in-my-bar';
import { ITEM_TYPES } from '../../helpers/constants';
import Bookmark from '../models/bookmarks';

module Bookmarks {
  export const create = async (userId: ObjectID, item: ObjectID, type: typeof ITEM_TYPES[number]): Promise<IBookmark> => {
    return await Bookmark.create({ userId, item, type });
  };

  export const list = async (userId: ObjectID, type: string): Promise<Array<IBookmark>> => {
    return await Bookmark.find({ userId, type });
  };

  export const getById = async (userId: ObjectID, id: ObjectID): Promise<IBookmark> => {
    return await Bookmark.findById(userId, id);
  };

  export const getByItem = async (userId: ObjectID, item: ObjectID): Promise<IBookmark> => {
    return await Bookmark.findOne({ userId, item });
  };

  export const getByType = async (userId: ObjectID, type: typeof ITEM_TYPES[number]): Promise<Array<IBookmark>> => {
    return await Bookmark.find({ userId, type });
  };

  export const remove = async (userId: ObjectID, _id: string): Promise<IBookmark | null> => {
    return await Bookmark.findOneAndDelete({ userId, _id });
  }

  export const drop = async () => {
    await Bookmark.deleteMany({});
  };
};

export default Bookmarks;