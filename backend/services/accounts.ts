import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import tokens from '../db/business/tokens';
import users from '../db/business/users';
import { badRequest, noReply, notFound, ok, unauthorized } from '../helpers/communication';
import { jwtExpirySeconds, jwtKey, TOKEN } from '../helpers/constants';
import { hashPassword } from '../lib/bytes';

const signUp = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  if (await users.findByName(username)) {
    return badRequest(res, `A user named "${username}" already exists`);
  };

  const user = await users.create(username, hashPassword(password), email);

  ok(res, { id: user.id });
};

const logIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await users.findByName(username);
  if (!user) {
    return notFound(res, `User "${user}" does not exist`);
  };

  const hashedPassword = hashPassword(password);
	if (user.password !== hashedPassword) {
    return unauthorized(res);
	};

	const token = jwt.sign({ id: user.id }, jwtKey, {
		algorithm: 'HS256',
		expiresIn: jwtExpirySeconds,
	});

  await tokens.create(user.id, token);
	res.cookie(TOKEN, token, { maxAge: jwtExpirySeconds * 1000 });

  noReply(res);
}

const logOut = async (req: Request, res: Response) => {
  res.clearCookie(TOKEN);

  noReply(res);
};

const closeAccount = async (req: Request, res: Response) => {
  await users.remove(req.userId);

  noReply(res);
};

export { logIn, signUp, logOut, closeAccount };
