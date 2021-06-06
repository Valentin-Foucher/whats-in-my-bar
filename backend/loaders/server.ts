import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, RequestHandler, Response } from 'express';
import morgan from 'morgan';
import serveFavicon from 'serve-favicon';
import accounts from '../api/accounts';
import articles from '../api/articles';
import bars from '../api/bars';
import bookmarks from '../api/bookmarks';
import cocktails from '../api/cocktails';
import ingredients from '../api/ingredients';
import search from '../api/search';
import version from '../api/version';
import ServiceError from './errors';

export const makeServer = (opts: {[key: string]: any}) => {
  let server = null;

  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  if (!(process.env.TEST)) {
    app.use(serveFavicon(__dirname + '/../public/images/favicon.ico'));
    app.use(morgan('combined'));
  };

  // version
  app.use('/', version);

  // endpoints
  app.use('/api/accounts', accounts);
  app.use('/api/articles', articles)
  app.use('/api/bar', bars);
  app.use('/api/bookmarks', bookmarks)
  app.use('/api/cocktails', cocktails);
  app.use('/api/ingredients', ingredients);
  app.use('/api/search', search);

  const addErrorHandler = (app: Express) => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (!(err instanceof ServiceError)) {
        console.error('Unexpected error', err);
      }
      return (err instanceof ServiceError
        ? res
          .status(err.statusCode)
          .json(err.toJSON())
        : res
          .status(500)
          .json({ type: 'internal_server_error' }));
    });
  };

  return {
    app,

    use(...args: any[]) {
      return app.use(...args);
    },

    get(path: any, ...args: Array<RequestHandler>) {
      return app.get(path, ...args);
    },

    post(path: any, ...args: Array<RequestHandler>) {
      return app.post(path, ...args);
    },

    start() {
      addErrorHandler(app);
      server = app.listen(opts.port);
      console.log(`Server has started on port ${opts.port}`);
    },

    close() {
      server.close();
    }
  };
};