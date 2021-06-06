import { Router } from 'express';
import { listBookmarks, createBookmark, deleteBookmark } from '../services/bookmarks';
import { createBookmarkSchema } from './validators/bookmarks';

const router = Router();

router.get('', function (req, res) {
  listBookmarks(req, res);
});

router.post('', createBookmarkSchema, function (req, res) {
  createBookmark(req, res);
});


router.delete('/:id', function (req, res) {
  deleteBookmark(req, res);
});


export default router;