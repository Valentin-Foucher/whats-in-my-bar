
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import server from '../app';
import bars from '../db/business/bars';
import ingredients from '../db/business/ingredients';
import tokens from '../db/business/tokens';
import users from '../db/business/users';
import { createBar, getBar, logIn, signUp, updateBar } from './helpers';

const { app } = server;

let coke = null;
let pepsi = null;
let user = null;
let cookie = null;

chai.should();
chai.use(chaiHttp);

describe('Bars API', () => {

  before(async () => {
    coke = await ingredients.create('coke', 'other');
    pepsi = await ingredients.create('pepsi', 'other');
    user = await signUp(app);
    cookie = (await logIn(app)).header['set-cookie'];
  });

  after(async () => {
    await users.drop();
    await tokens.drop();
    await bars.drop();
  });

  beforeEach(async () => {
    await bars.drop();
  });

  describe('POST bar', () => {
    it('should successfully create a bar', (done) => {
      createBar(app, cookie, user.id, 'The Bar-Mitzvah')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        done();
      });
    });

    it('should make a conflict when a user creates two bars', async () => {
      await createBar(app, cookie, user.id, 'The Bar-becue');

      const res = await createBar(app, cookie, user.id, 'The Bar-Bar-Ian');

      expect(res).to.have.status(409);
    });
  });

  describe('GET bar', () => {
    it('should return a 404', (done) => {
      getBar(app, cookie)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
    });

    it('should return the bar of the user', async () => {
      await createBar(app, cookie, user.id, 'The Bar-Bapapa');

      const res = await getBar(app, cookie)

      expect(res).to.have.status(200);
      expect(res.body.bar).to.be.not.empty;
    });
  });

  describe('PUT bar', () => {
    it('should add two ingredient to the bar', async () => {
      await createBar(app, cookie, user.id, 'The Bar-t-Simpson');

      const res = await updateBar(app, cookie, 'add', [coke.id, pepsi.id]);

      expect(res).to.have.status(204);
      const verifyResponse = await getBar(app, cookie);
      expect(verifyResponse.body.bar.ingredients).to.eql([coke.id, pepsi.id])
    });

    it('should remove an ingredient from the bar', async () => {
      await createBar(app, cookie, user.id, 'The Bar-racuda');
      await updateBar(app, cookie, 'add', [coke.id, pepsi.id]);

      const res = await updateBar(app, cookie, 'remove', [coke.id]);

      expect(res).to.have.status(204);

      const verifyResponse = await getBar(app, cookie);
      expect(verifyResponse.body.bar.ingredients).to.eql([pepsi.id]);
    });
  });

});
