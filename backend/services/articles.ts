import { ObjectID } from 'bson';
import { Request, Response } from 'express';
import articles from '../db/business/articles';
import { notFound, ok } from '../helpers/communication';


const getArticle = async (req: Request, res: Response) => {
  const article = await articles.getById(new ObjectID(req.params.id));

  if (!article) {
    return notFound(res);
  };

  ok(res, { article });
};


const listArticles = async (req: Request, res: Response) => {
  const articleList = await articles.list();

  ok(res, { articles: articleList });
};

export { getArticle, listArticles };
