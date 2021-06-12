import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import server from '../app';
import articles from '../db/business/articles';
import bookmarks from '../db/business/bookmarks';
import cocktails from '../db/business/cocktails';
import ingredients from '../db/business/ingredients';
import { createBookmark, signUp, logIn } from './helpers';

const { app } = server;

let ingredient = null;
let user = null;
let cookie = null;

chai.should();
chai.use(chaiHttp);


const createArticle = async (title = 'Hello', content = 'It\'s me', author = 'Mario') => {
  return await articles.create(title, content, author);
};

const createCocktail = async (name = 'Iced coke', glass_type = 'highball', ingredients = [{ id: ingredient.id, quantity: '17cl' }], category = 'mocktail', author = 'Luigi', characteristics = { sweet: true, refreshing: true }) => {
  return await cocktails.create(name, glass_type, ingredients, category, author, characteristics);
};


describe('Bookmarks API', () => {

  before(async () => {
    ingredient = await ingredients.create('coke', 'other');
    user = await signUp(app);
    cookie = (await logIn(app)).header['set-cookie'];
  });

  beforeEach(async () => {
    await bookmarks.drop();
    await cocktails.drop();
    await articles.drop();
  });

  after(async () => {
    await bookmarks.drop();
  });

  describe('POST bookmark', () => {
    it('should create a bookmark', async () => {
      const cocktail = await createCocktail();
      const res = await createBookmark(app, cookie, cocktail.id, 'cocktail');

      expect(res).to.have.status(200);
    });

    it('should fail to create twice a bookmark', async () => {
      const cocktail = await createCocktail();
      await createBookmark(app, cookie, cocktail.id, 'cocktail');

      const res = await createBookmark(app, cookie, cocktail.id, 'cocktail');

      expect(res).to.have.status(409);
    });

    it('should fail to create a bookmark of the wrong type', async () => {
      const cocktail = await createCocktail();

      const res = await createBookmark(app, cookie, cocktail.id, 'article');

      expect(res).to.have.status(404);
    });
  });

  describe('GET bookmarks', () => {
    it('should successfully return an empty list for cocktails', async () => {
      await createArticle();

      const res = await chai.request(app).get('/api/bookmarks?type=cocktail').set('Cookie', cookie);

      expect(res).to.have.status(200);
      expect(res.body.bookmarks).to.be.empty;
    });

    it('should successfully return a 400', async () => {
      let res = await chai.request(app).get('/api/bookmarks').set('Cookie', cookie);

      expect(res).to.have.status(400);

      res = await chai.request(app).get('/api/bookmarks?type=wtf').set('Cookie', cookie);

      expect(res).to.have.status(400);
    });

    it('should successfully return an empty list for articles', async () => {
      await createCocktail();

      const res = await chai.request(app).get('/api/bookmarks?type=article').set('Cookie', cookie);

      expect(res).to.have.status(200);
      expect(res.body.bookmarks).to.be.empty;
    });

    it('should return one bookmark for an article but not for a cocktail', async () => {
      const article = await createArticle();
      await createCocktail();
      await createBookmark(app, cookie, article.id, 'article');

      const res = await chai.request(app).get('/api/bookmarks?type=article').set('Cookie', cookie);

      expect(res).to.have.status(200);
      expect(res.body.bookmarks).to.have.length(1);

      const bookmark = res.body.bookmarks[0];
      expect(bookmark.item).to.equal(article.id);
      expect(bookmark.type).to.equal('article');
    });
  });


  describe('DELETE bookmarks', () => {
    it('should successfully delete a bookmark', async () => {
      const cocktail = await createCocktail();
      const bookmarkId = (await createBookmark(app, cookie, cocktail.id, 'cocktail')).body.id;

      const res = await chai.request(app).delete(`/api/bookmarks/${bookmarkId}`).set('Cookie', cookie);

      expect(res).to.have.status(204);
    });

    it('should successfully return a 404', async () => {
      let res = await chai.request(app).delete('/api/bookmarks/60c4c4de103e832827543d64').set('Cookie', cookie);

      expect(res).to.have.status(404);
    });
  });

});
