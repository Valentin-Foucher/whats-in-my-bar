import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import server from '../app';
import ingredients from '../db/business/ingredients';

const { app } = server;

chai.should();
chai.use(chaiHttp);

const createIngredient = async (name = 'coke', category = 'other', ) => {
  return await ingredients.create(name, category);
};

describe('Ingredients API', () => {

  beforeEach(async () => {
    await ingredients.drop();
  })

  after(async () => {
    await ingredients.drop();
  });

  describe('GET ingredients', () => {
    it('should successfully return an empty list', (done) => {
      chai.request(app)
      .get('/api/ingredients')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.ingredients).to.be.empty;
        done();
      });
    });

    it('should return one ingredient', async () => {
      await createIngredient();

      const res = await chai.request(app).get('/api/ingredients');

      expect(res).to.have.status(200);
      expect(res.body.ingredients).to.have.length(1);

      const ingredient = res.body.ingredients[0];
      expect(ingredient.name).to.equal('coke');
      expect(ingredient.category).to.equal('other');
    });
  });

  describe('GET ingredient', () => {
    it('should return a 404 because the ingredient was not found', (done) => {
      chai.request(app)
      .get(`/api/ingredients/60aa9a59e9eada4f6738b211`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
    });

    it('should successfully retrieve the ingredient by its id', async () => {
      const ingredient = await createIngredient();

      const res = await chai.request(app).get(`/api/ingredients/${ingredient.id}`);
      expect(res).to.have.status(200);
      expect(res.body.ingredient).to.be.not.undefined;
    });
  });

});
