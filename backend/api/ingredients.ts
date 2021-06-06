import { Router } from 'express';
import { getIngredient, listIngredients } from '../services/ingredients';

const router = Router();

router.get('', function (req, res) {
  listIngredients(req, res);
});

router.get('/:id', function (req, res) {
  getIngredient(req, res);
});

export default router;