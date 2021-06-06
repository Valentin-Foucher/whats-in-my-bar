import { ITEM_TYPES } from './../../helpers/constants';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../helpers/validators';

function createBookmarkSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    type: Joi.string().valid(...ITEM_TYPES).required(),
    item: Joi.string().required()
  });
  validateRequest(req, next, schema);
};

export { createBookmarkSchema };