import { Request, Response } from 'express';
import cocktails from '../db/business/cocktails';
import users from '../db/business/users';
import ingredients from '../db/business/ingredients';
import { badRequest, ok } from '../helpers/communication';
import articles from '../db/business/articles';

const search = async (req: Request, res: Response) => {
  const { query } = req.query;

  let username = null;
  if (req.userId) {
    username = (await users.findById(req.userId)).username
  };

  if (!(query && typeof query === 'string')) {
    return badRequest(res, 'query must be a unique query parameter');
  };

  const cocktailList = await cocktails.list(username, { name: { $regex: `^${query}`, $options: 'i' }  });
  const ingredientList = await ingredients.list({ name: { $regex: `^${query}`, $options: 'i' }  });
  const articleList = await articles.list({ title: { $regex: `^${query}`, $options: 'i' } });

  ok(res, { cocktails: cocktailList, ingredients: ingredientList, articles: articleList });
};

export { search };