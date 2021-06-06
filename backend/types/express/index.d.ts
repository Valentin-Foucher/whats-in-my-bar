import { ObjectID } from 'bson';

declare module 'express' {
  interface Request {
    userId?: ObjectID
  }
  interface Response {
  }
}
