import { ObjectID } from 'bson';
import { IBookmark } from 'whats-in-my-bar';
import { ITEM_TYPES } from '../../helpers/constants';
import Bookmark from '../models/bookmarks';

module Bookmarks {
  export const create = async (item: ObjectID, type: typeof ITEM_TYPES[number]): Promise<IBookmark> => {
    return await Bookmark.create({ item, type });
  };

  export const list = async (type: string): Promise<Array<IBookmark>> => {
    return await Bookmark.find({ type });
  };

  export const getById = async (id: ObjectID): Promise<IBookmark> => {
    return await Bookmark.findById(id);
  };

  export const getByItem = async (item: ObjectID): Promise<IBookmark> => {
    return await Bookmark.findOne({ item });
  };

  export const getByType = async (type: typeof ITEM_TYPES[number]): Promise<Array<IBookmark>> => {
    return await Bookmark.find({ type });
  };

  export const remove = async (id: ObjectID) => {
    await Bookmark.findByIdAndDelete(id);
  }

  export const drop = async () => {
    await Bookmark.deleteMany({});
  };
};

export default Bookmarks;