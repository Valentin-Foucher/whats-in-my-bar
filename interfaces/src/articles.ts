import { Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
};
