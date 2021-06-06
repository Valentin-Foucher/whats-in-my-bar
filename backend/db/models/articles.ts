import { IArticle } from 'whats-in-my-bar';
import { model, Schema } from 'mongoose';


export const ArticleSchemaDefinition = {
  title: { type: String, unique: true, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }
};

export default model<IArticle>('Article', new Schema(ArticleSchemaDefinition), 'articles');