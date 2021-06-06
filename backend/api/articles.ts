import { Router } from 'express';
import { listArticles, getArticle } from '../services/articles';

const router = Router();

router.get('', function (req, res) {
  listArticles(req, res);
});

router.get('/:id', function (req, res) {
  getArticle(req, res);
});

export default router;