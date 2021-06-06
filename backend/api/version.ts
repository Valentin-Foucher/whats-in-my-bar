import { Router } from 'express';
import { ok } from '../helpers/communication';
import { version } from '../package.json';

const router = Router();

router.get(['', '/api'], function (req, res) {
  ok(res, { version });
});

export default router;