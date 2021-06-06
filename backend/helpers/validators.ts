import { Request, NextFunction } from 'express';
import Joi from 'joi';

function validateRequest(req: Request, next: NextFunction, schema: Joi.Schema) {
  const options = {
      abortEarly: false,
      allowUnknown: false
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
      next(`Invalid payload: ${error.details.map(x => x.message).join(', ')}`);
  } else {
      req.body = value;
      next();
  };
};

export { validateRequest };