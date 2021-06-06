import { Router } from 'express';
import { mayAuthenticate } from '../helpers/middlewares';
import { search } from '../services/search';

const router = Router();

router.get('', mayAuthenticate, function (req, res) {
  search(req, res);
});

export default router;