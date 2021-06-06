import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import server from '../app';
import users from '../db/business/users';
import tokens from '../db/business/tokens';
import { logIn, signUp, logOut, closeAccount } from './helpers';

const { app } = server;

chai.should();
chai.use(chaiHttp);

describe('Connections API', () => {

  beforeEach( async () => await users.drop());
  after( async () => await tokens.drop());

  describe('POST signup', () => {
    it('should successfully signup', (done) => {
      signUp(app)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        done();
      });
    });
  });

  describe('POST login', () => {
    it('should successfully login', async () => {
      await signUp(app);

      const res = await logIn(app);

      expect(res).to.have.status(204);
      expect(res).to.have.cookie('token');
    });
  });

  describe('POST logout', () => {
    it('should successfully logout', async () => {
      await signUp(app);

      const token = (await logIn(app)).header['set-cookie'];
      const res = await logOut(app, token);

      expect(res).to.have.status(204);
    });
  });

  describe('POST close account', () => {
    it('should successfully close the account', async () => {
      await signUp(app);

      const token = (await logIn(app)).header['set-cookie'];
      const res = await closeAccount(app, token);

      expect(res).to.have.status(204);
    });
  });

});
