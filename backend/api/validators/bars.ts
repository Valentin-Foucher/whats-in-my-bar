import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../helpers/validators';


function createBarSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(32).required()
  });
  validateRequest(req, next, schema);
};

function updateBarSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
      ingredients: Joi.array().items(Joi.string())
  });
  validateRequest(req, next, schema);
};

export { createBarSchema, updateBarSchema };
