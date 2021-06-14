import { ObjectID } from 'bson';
import { FilterQuery } from 'mongoose';
import { IArticle } from 'whats-in-my-bar';
import Article from '../models/articles';

module Articles {
  export const create = async (title: string, content: string, author: string): Promise<IArticle> => {
    return await Article.create({ title, content, author });
  };

  export const list = async (match = {}): Promise<Array<IArticle>> => {
    return await Article.aggregate([
        { $match: match },
        {
        $project:
          {
            id: '$_id',
            title: 1,
            preview: { $substr: [ '$content', 0, 200 ] },
            author: 1
          }
      },
      { $sort: { title: 1 } }
    ]);
  };

  export const getById = async (id: ObjectID): Promise<IArticle> => {
    return await Article.findById(id);
  };

  export const exists = async (filter: FilterQuery<IArticle>): Promise<Boolean> => {
    return await Article.exists(filter);
  };

  export const drop = async () => {
    await Article.deleteMany({});
  };
};

export default Articles;