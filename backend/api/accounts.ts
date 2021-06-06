import { Router } from 'express';
import { authenticate } from '../helpers/middlewares';
import { closeAccount, logIn, logOut, signUp } from '../services/accounts';
import { logInSchema, signUpSchema } from './validators/accounts';

const router = Router();

router.post('/signup', signUpSchema, function (req, res) {
  signUp(req, res);
});

router.post('/close_account', authenticate, function (req, res) {
  closeAccount(req, res);
});

router.post('/login', logInSchema, function (req, res) {
  logIn(req, res);
});

router.post('/logout', authenticate, function (req, res) {
  logOut(req, res);
});

export default router;