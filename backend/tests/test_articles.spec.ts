import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import server from '../app';
import articles from '../db/business/articles';

const { app } = server;

chai.should();
chai.use(chaiHttp);

const createArticle = async (title = 'My Preferred Mint Julep', content = `While the Mint Julep is a very old, classic drink, going back to the beginning of the 1800's, the term "Julep" is downright ancient dating back to about 600 AD.  It was a word that essentially meant "Medicine", much like "Tonic" but there's obviously no medicine in the Mint Julep (or any julep for that matter) so what gives?  Well, ancient people (And even not so ancient people) had a funny idea of what "Medicine" entailed and at least when possible it involved booze.  The modern Julep of course was never intended as a curative, the name it seems is something of a joke.  Similar to when my Grandmother would request her "Nerve Medicine" or her "Tonic" what she meant was "My bottle of blackberry brandy, no glass please".\n\nThe Mint Julep itself has a long history and has seen much evolution in it's standard preparation.  Brandy, Cognac, Rye, Bourbon, even Rum have all been featured in it's silver beaker.  Syrup or sugar, and which sugar? Bitters?  Of course yes, all of these have at various times been considered standards in the Mint Julep.  For what it's worth I prefer Bourbon in mine, made with a bit of demerara syrup and some bitters, and plenty of mint.\n\nLike any drink with so much history, the Mint Julep has found itself regarded as a matter of religion among it's devotees.  Many insist that you must not muddle the mint, or on the number of mint leaves to be utilized, on the amount of time the drink must rest, on the quality of ice, etc. Much like the Old Fashioned, a great many people have some very strong ideas about how it must be made.\n\nPersonally, I don't have time for that.  I like my mint muddled here because I was the drink to be quite minty, but if you prefer not, that's no skin off my nose.  The only things of true importance in my opinion here are that liqour, copious ice, and great quantities of mint are involved.`, author = 'Greg') => {
  return await articles.create(title, content, author);
};

describe('Articles API', () => {

  beforeEach(async () => {
    await articles.drop();
  })

  after(async () => {
    await articles.drop();
  });

  describe('GET articles', () => {
    it('should successfully return an empty list', (done) => {
      chai.request(app)
      .get('/api/articles')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.articles).to.be.empty;
        done();
      });
    });

    it('should return one article', async () => {
      await createArticle();

      const res = await chai.request(app).get('/api/articles')

      expect(res).to.have.status(200);
      expect(res.body.articles).to.have.length(1);

      const article = res.body.articles[0];
      expect(article.id).to.be.not.undefined;
      expect(article.title).to.equal('My Preferred Mint Julep');
      expect(article.preview).to.have.length(200);
      expect(article.author).to.equal('Greg');
    });
  });

  describe('GET article', () => {
    it('should return a 404 because the article was not found', (done) => {
      chai.request(app)
      .get(`/api/articles/60aa9a59e9eada4f6738b211`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
    });

    it('should successfully retrieve the article by its id', async () => {
      const article = await createArticle();

      chai.request(app)
      .get(`/api/articles/${article.id}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.article).to.be.not.undefined;
      });
    });
  });

});
