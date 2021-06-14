import { Router } from 'express';
import { authenticate } from '../helpers/middlewares';
import { listBookmarks, createBookmark, deleteBookmark } from '../services/bookmarks';
import { createBookmarkSchema } from './validators/bookmarks';

const router = Router();

router.get('', authenticate, function (req, res) {
  listBookmarks(req, res);
});

router.post('', authenticate, createBookmarkSchema, function (req, res) {
  createBookmark(req, res);
});


router.delete('/:id', authenticate, function (req, res) {
  deleteBookmark(req, res);
});


export default router;