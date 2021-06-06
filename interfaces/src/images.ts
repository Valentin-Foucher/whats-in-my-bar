import { ObjectID } from 'bson';


export interface IImage {
  filename: ObjectID;
  filetype: string;
  content?: string;
};
