import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import articles from '../db/business/articles';
import cocktails from '../db/business/cocktails';
import ingredients from '../db/business/ingredients';
import server from '../app';

const { app } = server;

chai.should();
chai.use(chaiHttp);

const createArticle = async (title: string) => {
  await articles.create(title, 'A', 'AA');
};

const createIngredient = async (name: string) => {
  await ingredients.create(name, 'other');
};

const createCocktail = async (name: string) => {
  const cocktail = await cocktails.create(
    name, 'highball', [{ id: (await ingredients.create('A', 'other')).id, quantity: '12cl' }], 'classic', 'AA', {}, 'AAA'
  );
  cocktail.public = true;
  await cocktail.save();
};

describe('Search API', () => {

  beforeEach(async () => {
    await articles.drop();
    await ingredients.drop();
    await cocktails.drop();
  })

  after(async () => {
    await articles.drop();
    await ingredients.drop();
    await cocktails.drop();
  });

  describe('GET search', () => {
    it('should successfully return empty lists', (done) => {
      chai.request(app)
      .get('/api/search?query=aycaramba')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.articles).to.be.empty;
        expect(res.body.ingredients).to.be.empty;
        expect(res.body.cocktails).to.be.empty;
        done();
      });
    });

    it('should successfully return filtered lists', async () => {
      await createArticle('Old nick and co');
      await createArticle('Getting started');
      await createIngredient('olive oil');
      await createIngredient('Orange juice');
      await createCocktail('OLd fashioned');
      await createCocktail('Mojito');

      const res = await chai.request(app).get('/api/search?query=ol');

      expect(res).to.have.status(200);
      expect(res.body.articles).to.have.length(1);
      expect(res.body.ingredients).to.have.length(1);
      expect(res.body.cocktails).to.have.length(1);
      expect(res.body.articles[0].title).to.equal('Old nick and co');
      expect(res.body.ingredients[0].name).to.equal('olive oil');
      expect(res.body.cocktails[0].name).to.equal('OLd fashioned');
    });
  });

});
