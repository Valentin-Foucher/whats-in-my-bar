import { ObjectID } from 'bson';
import { COCKTAIL, ARTICLE, ITEM_TYPES } from './../helpers/constants';
import { Request, Response } from 'express';
import bookmarks from '../db/business/bookmarks';
import articles from '../db/business/articles';
import cocktails from '../db/business/cocktails';
import { badRequest, conflict, noReply, notFound, ok } from '../helpers/communication';


const listBookmarks = async (req: Request, res: Response) => {
  const { type } = req.query;

  if (!(type && typeof type === 'string' && ITEM_TYPES.includes(type))) {
    return badRequest(res, 'Provide a type as parameter to retrieve bookmarks')
  }

  const bookmarkList = await bookmarks.list(type);

  ok(res, { bookmarks: bookmarkList });
};


const createBookmark = async (req: Request, res: Response) => {
  const { item, type } = req.body;

  if (await bookmarks.getByItem(item)) {
    return conflict(res, 'You already bookmarked this item');
  };

  if (type == COCKTAIL) {
    if (!(await cocktails.exists({ _id: item }))) {
      return notFound(res, 'This cocktail does not exist');
    };
  } else if (type == ARTICLE) {
    if (!(await articles.exists({ _id: item }))) {
      return notFound(res, 'This article does not exist');
    };
  } else {
    badRequest(res, `Invalid type ${type}`)
  };

  const bookmark = await bookmarks.create(item, type);

  ok(res, { id: bookmark.id });
};

const deleteBookmark = async(req: Request, res: Response) => {
  try {
    await bookmarks.remove(new ObjectID(req.params.id))
  } catch (err) {
    return notFound(res, 'This bookmark does not exist');
  };

  noReply(res);
};

export { listBookmarks, createBookmark, deleteBookmark };
