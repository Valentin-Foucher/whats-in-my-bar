
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import server from '../app';
import Cocktail from '../db/models/cocktails';
import cocktails from '../db/business/cocktails';
import ingredients from '../db/business/ingredients';
import tokens from '../db/business/tokens';
import users from '../db/business/users';
import { logIn, signUp, createCocktail, createBar, updateBar } from './helpers';
import bars from '../db/business/bars';

const { app } = server;

let ingredient = null;
let user = null;
let cookie = null;

chai.should();
chai.use(chaiHttp);

const createTestCocktail = async (
  name = 'iced coke', glass_type = 'highball', ingredientQuantity = '17cl', author = 'Batman', characteristics: { [key: string]: boolean } = { sweet: true, refreshing: true }
) => {
  return await cocktails.create(
    name, glass_type, [{ id: ingredient.id, quantity: ingredientQuantity }], 'mocktail', author, characteristics, ''
  );
};

describe('Cocktails API', () => {

  before(async () => {
    ingredient = await ingredients.create('coke', 'other');
    user = await signUp(app);
    cookie = (await logIn(app)).header['set-cookie'];
    await createBar(app, cookie, user.id, 'The A-Bar-acadabra');
  });

  after(async () => {
    await users.drop();
    await tokens.drop();
    await cocktails.drop();
    await ingredients.drop();
    await bars.drop();
  });

  beforeEach(async () => {
    await cocktails.drop();
  });

  describe('POST cocktail', () => {
    it('should successfully create the cocktail', (done) => {
      createCocktail(app, cookie, {name: 'iced coke', glass_type: 'highball', ingredients: [{ id: ingredient.id, quantity: '17cl' }], category: 'mocktail', author: 'Batman', characteristics:  { sweet: true, refreshing: true }})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.id).to.be.not.undefined;
        done();
      });
    });

    it('should return a 422 because the cocktail already exist', async () => {
      await createCocktail(app, cookie, {name: 'iced coke', glass_type: 'highball', ingredients: [{ id: ingredient.id, quantity: '17cl' }], category: 'mocktail', author: 'Batman', characteristics:  { sweet: true, refreshing: true }});

      const res = await createCocktail(app, cookie, {name: 'iced coke', glass_type: 'lowball', ingredients: [{ id: ingredient.id, quantity: '18cl' }], category: 'mocktail', author: 'Joker', characteristics:  { sweet: true }});

      expect(res).to.have.status(422);
    });
  });


  describe('GET cocktail', () => {
    it('should successfully retrieve the cocktail by its id', async () => {
      const cocktail = await createTestCocktail();

      const res = await chai.request(app).get(`/api/cocktails/${cocktail.id}`);

      expect(res).to.have.status(200);
      expect(res.body.cocktail).to.be.not.undefined;
    });

    it('should return a 404 because the coctail was not found', (done) => {
      chai.request(app)
      .get(`/api/cocktails/60aa9a59e9eaca4f6738b211`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('GET cocktails', () => {
    it('should successfully return an empty list', (done) => {
      chai.request(app)
      .get('/api/cocktails')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.cocktails).to.be.empty;
        done();
      });
    });

    it('should not return private cocktails', async () => {
      await createTestCocktail();

      chai.request(app)
      .get('/api/cocktails')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.cocktails).to.be.empty;
      });
    });

    it('should return one cocktail', async () => {
      const cocktail = await createTestCocktail();
      cocktail.public = true;
      await cocktail.save();

      const res = await chai.request(app).get('/api/cocktails')
      expect(res).to.have.status(200);
      expect(res.body.cocktails).to.have.length(1);

      const firstCocktail = res.body.cocktails[0];
      expect(firstCocktail.name).to.equal('iced coke');
      expect(firstCocktail.glass_type).to.equal('highball');
      expect(firstCocktail.author).to.equal('Batman');
      expect(firstCocktail.ingredients).to.have.length(1);
      expect(firstCocktail.ingredients[0].id).to.equal(ingredient.id);
      expect(firstCocktail.ingredients[0].quantity).to.equal('17cl');
    });

    it('should filter cocktails', async () => {
      const cocktail = await createTestCocktail();
      const cocktail2 = await createTestCocktail('coke with crushed ice', 'lowball', '14cl', 'Batman', { refreshing: true });

      cocktail.public = true;
      await cocktail.save();
      cocktail2.public = true;
      await cocktail2.save();

      chai.request(app)
      .get('/api/cocktails?glass_type=lowball')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.cocktails).to.have.length(1);
      });

      chai.request(app)
      .get('/api/cocktails?author=Batman')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.cocktails).to.have.length(2);
      });

      chai.request(app)
      .get('/api/cocktails?characteristics.sweet=true')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.cocktails).to.have.length(1);
      });

      chai.request(app)
      .get('/api/cocktails?characteristics.refreshing=true')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.cocktails).to.have.length(2);
      });

      chai.request(app)
      .get('/api/cocktails?characteristics.refreshing=true&glass_type=lowball')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.cocktails).to.have.length(1);
      });
    });
  });

  describe('GET cocktails from bar', () => {
    it('should get cocktails available in the in-memory bar', async () => {
      const gin = await ingredients.create('gin', 'spirits');
      const tonic = await ingredients.create('tonic', 'other');
      const dryVermouth = await ingredients.create('dry vermout', 'spirits');
      const vodka = await ingredients.create('vodka', 'spirits');

      await createCocktail(app, cookie, { name: 'gin tonic', glass_type: 'highball', ingredients: [{ id: gin.id, quantity: '6cl' }, { id: tonic.id, quantity: '10cl' }], category: 'highball', author: 'Churchill', characteristics:  { bitter: true, refreshing: true } });
      await createCocktail(app, cookie, { name: 'dry martini', glass_type: 'martini', ingredients: [{ id: gin.id, quantity: '5cl' }, { id: dryVermouth.id, quantity: '1cl' }], category: 'classic', author: 'Churchill', characteristics:  { dry: true, spirituous: true } });
      await createCocktail(app, cookie, { name: 'wet vodka martini', glass_type: 'martini', ingredients: [{ id: vodka.id, quantity: '4cl' }, { id: dryVermouth.id, quantity: '2cl' }], category: 'classic', author: 'James Bond', characteristics: { smooth: true, spirituous: true } })

      await Cocktail.updateMany({}, { public: true });

      const res = await chai.request(app)
        .post('/api/cocktails/from_bar')
        .send({ ingredients: [gin.id, tonic.id]});

      expect(res).to.have.status(200);
      expect(res.body.cocktails).to.have.length(1);
      expect(res.body.cocktails[0].name).to.equal('gin tonic');
      expect(res.body.withMissingIngredients).to.have.length(1);
      expect(res.body.withMissingIngredients[0].name).to.equal('dry martini');
    });

    it('should get cocktails available in the user bar', async () => {
      const gin = await ingredients.create('gin', 'spirits');
      const tonic = await ingredients.create('tonic', 'other');
      const dryVermouth = await ingredients.create('dry vermout', 'spirits');
      const vodka = await ingredients.create('vodka', 'spirits');

      await createCocktail(app, cookie, { name: 'gin tonic', glass_type: 'highball', ingredients: [{ id: gin.id, quantity: '6cl' }, { id: tonic.id, quantity: '10cl' }], category: 'highball', author: 'Churchill', characteristics:  { bitter: true, refreshing: true } });
      await createCocktail(app, cookie, { name: 'dry martini', glass_type: 'martini', ingredients: [{ id: gin.id, quantity: '5cl' }, { id: dryVermouth.id, quantity: '1cl' }], category: 'classic', author: 'Churchill', characteristics:  { dry: true, spirituous: true } });
      await createCocktail(app, cookie, { name: 'wet vodka martini', glass_type: 'martini', ingredients: [{ id: vodka.id, quantity: '4cl' }, { id: dryVermouth.id, quantity: '2cl' }], category: 'classic', author: 'James Bond', characteristics: { smooth: true, spirituous: true } })

      await Cocktail.updateMany({}, { public: true });
      await updateBar(app, cookie, 'add', [gin.id, tonic.id]);

      const res = await chai.request(app)
      .post('/api/cocktails/from_bar')
      .set('Cookie', cookie)
      .send();

      expect(res).to.have.status(200);
      expect(res.body.cocktails).to.have.length(1);
      expect(res.body.cocktails[0].name).to.equal('gin tonic');
      expect(res.body.withMissingIngredients).to.have.length(1);
      expect(res.body.withMissingIngredients[0].name).to.equal('dry martini');
    });
  });

});
