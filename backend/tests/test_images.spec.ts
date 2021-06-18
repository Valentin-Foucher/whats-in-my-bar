import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import server, { connection } from '../app';
import { createImage, getImage, updateImage } from './helpers';
import Image from '../db/models/images';
import ingredients from '../db/business/ingredients';

const { app } = server;

let ingredient = null;

chai.should();
chai.use(chaiHttp);


describe('Images API', () => {

  before(async () => {
    ingredient = await ingredients.create('coke', 'other');
  });

  after(async () => {
    await ingredients.drop();
    await connection.collection('uploads.files').deleteMany({});
  });

  beforeEach(async () => {
    await Image.deleteMany({})
    await connection.collection('uploads.files').deleteMany({});
  });

  describe('POST image', () => {
    it('should successfully post an image', (done) => {
      createImage(app, ingredient.id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        done();
      });
    });

    it('should obtain recreate the image', async () => {
      await createImage(app, ingredient.id);
      const res = await createImage(app, ingredient.id);
      expect(res).to.have.status(204);
    });
  });

  describe('GET image', () => {
    it('should successfully get an image', async () => {
      await createImage(app, ingredient.id);

      const res = await getImage(app, ingredient.id)

      expect(res).to.have.status(200);
    });

    it('should remove not used images when getting an image', async () => {
      await createImage(app, ingredient.id);
      await createImage(app, ingredient.id);

      expect(await connection.collection('uploads.files').countDocuments()).to.equal(2);

      await getImage(app, ingredient.id);

      expect(await connection.collection('uploads.files').countDocuments()).to.equal(1);
    });
  });

  describe('PUT update image', () => {
    it('should successfully update an image', async () => {
      await createImage(app, ingredient.id);

      let res = await getImage(app, ingredient.id)

      expect(res).to.have.status(200);

      res = await updateImage(app, ingredient.id);

      expect(res).to.have.status(204);
    });
  });

});
