import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import tokens from '../db/business/tokens';
import { forbidden, unauthorized } from './communication';
import { jwtKey, TOKEN } from './constants';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const tokenValue = req.cookies[TOKEN];
  if (tokenValue == null) {
    return unauthorized(res);
  };

  jwt.verify(tokenValue, jwtKey, async (err: any, _: any) => {
    if (err) {
      return forbidden(res);
    };

    const token = await tokens.getByValue(tokenValue);
    req.userId = token.userId;

    next();
  });
};

const mayAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  const tokenValue = req.cookies[TOKEN];
  if (tokenValue == null) {
    return next();
  };

  jwt.verify(tokenValue, jwtKey, async (err: any, _: any) => {
    if (err) {
      return next();
    };

    const token = await tokens.getByValue(tokenValue)
    req.userId = token.userId;

    next();
  });
};

export { authenticate, mayAuthenticate };
