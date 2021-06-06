import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../helpers/validators';
import Joi from 'joi';


function signUpSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
      username: Joi.string().min(8).max(64).required(),
      password: Joi.string().min(8).max(64).required(),
      email: Joi.string().email().required()
  });
  validateRequest(req, next, schema);
};

function logInSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
      username: Joi.string().min(8).max(64).required(),
      password: Joi.string().min(8).max(64).required()
  });
  validateRequest(req, next, schema);
};

export { signUpSchema, logInSchema };