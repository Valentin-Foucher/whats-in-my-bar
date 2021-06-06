import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import server from '../app';
import articles from '../db/business/articles';
import bookmarks from '../db/business/bookmarks';
import cocktails from '../db/business/cocktails';
import ingredients from '../db/business/ingredients';
import { createBookmark } from './helpers';

const { app } = server;
let ingredient = null;

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
      const res = await createBookmark(app, cocktail.id, 'cocktail');

      expect(res).to.have.status(200);
    });

    it('should fail to create twice a bookmark', async () => {
      const cocktail = await createCocktail();
      await createBookmark(app, cocktail.id, 'cocktail');

      const res = await createBookmark(app, cocktail.id, 'cocktail');

      expect(res).to.have.status(409);
    });

    it('should fail to create a bookmark of the wrong type', async () => {
      const cocktail = await createCocktail();

      const res = await createBookmark(app, cocktail.id, 'article');

      expect(res).to.have.status(404);
    });
  });

  describe('GET bookmarks', () => {
    it('should successfully return an empty list for cocktails', async () => {
      await createArticle();

      const res = await chai.request(app).get('/api/bookmarks?type=cocktail');

      expect(res).to.have.status(200);
      expect(res.body.bookmarks).to.be.empty;
    });

    it('should successfully return a 400', async () => {
      let res = await chai.request(app).get('/api/bookmarks');

      expect(res).to.have.status(400);

      res = await chai.request(app).get('/api/bookmarks?type=wtf');

      expect(res).to.have.status(400);
    });

    it('should successfully return an empty list for articles', async () => {
      await createCocktail();

      const res = await chai.request(app).get('/api/bookmarks?type=article');

      expect(res).to.have.status(200);
      expect(res.body.bookmarks).to.be.empty;
    });

    it('should return one bookmark for an article but not for a cocktail', async () => {
      const article = await createArticle();
      await createCocktail();
      await createBookmark(app, article.id, 'article');

      const res = await chai.request(app).get('/api/bookmarks?type=article');

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
      await createBookmark(app, cocktail.id, 'cocktail');

      const res = await chai.request(app).delete(`/api/bookmarks/${cocktail.id}`);

      expect(res).to.have.status(204);
    });

    it('should successfully return a 404', async () => {
      let res = await chai.request(app).delete('/api/bookmarks/12345');

      expect(res).to.have.status(404);
    });
  });

});
