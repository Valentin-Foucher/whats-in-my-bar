import { ObjectID } from 'bson';
import { Request, Response } from 'express';
import bars from '../db/business/bars';
import { conflict, noReply, notFound, ok } from '../helpers/communication';

const createBar = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (await bars.getByUserId(req.userId)) {
    return conflict(res, 'You already have a bar');
  }

  await bars.create(req.userId, name);

  noReply(res);
};

const getBar = async (req: Request, res: Response) => {
  const bar = await bars.getByUserId(req.userId);

  if (!bar) {
    return notFound(res);
  };

  ok(res, { bar });
};

const addToBar = async (req: Request, res: Response) => {
  const { ingredients } = req.body;

  const bar = await bars.getByUserId(req.userId);
  if (!bar) {
    return notFound(res);
  };

  ingredients.forEach((ingredient: ObjectID) => {
    if (!bar.ingredients.includes(ingredient)) {
      bar.ingredients.push(ingredient)
    };
  });
  bar.save()

  noReply(res);
};


const removeFromBar = async (req: Request, res: Response) => {
  const { ingredients } = req.body;

  const bar = await bars.getByUserId(req.userId);
  if (!bar) {
    return notFound(res);
  };

  bar.ingredients = bar.ingredients.filter((ingredient: ObjectID) => !ingredients.includes(ingredient.toString()));
  bar.save()

  noReply(res);
};


export { createBar, getBar, addToBar, removeFromBar };
