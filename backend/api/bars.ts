import { Router } from 'express';
import { authenticate } from '../helpers/middlewares';
import { addToBar, createBar, getBar, removeFromBar } from '../services/bars';
import { createBarSchema, updateBarSchema } from './validators/bars';

const router = Router();

router.get('', authenticate, function (req, res) {
  getBar(req, res);
});

router.post('', authenticate, createBarSchema, function (req, res) {
  createBar(req, res);
});

router.put('/add', authenticate, updateBarSchema, function (req, res) {
  addToBar(req, res);
});

router.put('/remove', authenticate, updateBarSchema, function (req, res) {
  removeFromBar(req, res);
});


export default router;