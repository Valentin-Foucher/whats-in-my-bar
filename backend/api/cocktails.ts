import { Router } from 'express';
import { authenticate, mayAuthenticate } from '../helpers/middlewares';
import { listCocktails, createCocktail, getCocktail, getCocktailsFromBar } from '../services/cocktails';
import { createCocktailSchema, getCocktailFromIngredientsSchema } from './validators/cocktails';

const router = Router();

router.get('', mayAuthenticate, function (req, res) {
  listCocktails(req, res);
});

router.get('/:id', function (req, res) {
  getCocktail(req, res);
});

router.post('', authenticate, createCocktailSchema, function (req, res) {
  createCocktail(req, res);
});

router.post('/from_bar', mayAuthenticate, getCocktailFromIngredientsSchema, function(req, res) {
  getCocktailsFromBar(req, res);
});

export default router;