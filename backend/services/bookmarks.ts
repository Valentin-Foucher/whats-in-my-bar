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

  const bookmarkList = await bookmarks.list(req.userId, type);

  ok(res, { bookmarks: bookmarkList });
};


const createBookmark = async (req: Request, res: Response) => {
  const { item, type } = req.body;

  if (await bookmarks.getByItem(req.userId, item)) {
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

  const bookmark = await bookmarks.create(req.userId, item, type);

  ok(res, { id: bookmark.id });
};

const deleteBookmark = async(req: Request, res: Response) => {
  const deleted = await bookmarks.remove(req.userId, req.params.id);
  if (!deleted) {
    return notFound(res, 'This bookmark does not exist');
  };

  noReply(res);
};

export { listBookmarks, createBookmark, deleteBookmark };
