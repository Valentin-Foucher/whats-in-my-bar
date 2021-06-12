import { ObjectID } from 'bson';
import chai from 'chai';
import { Express } from 'express';

const TEST_USER = 'test_user';
const TEST_PASSWORD = 'Test_password1';
const TEST_EMAIL = 'user@test.com';

// ----------- \\ ACCOUNT // ----------- \\

export const signUp = (app: Express) => {
  return chai.request(app)
  .post('/api/accounts/signup')
  .send({
    'username': TEST_USER,
    'password': TEST_PASSWORD,
    'email': TEST_EMAIL
  });
};

export const logOut = (app: Express, cookie: string) => {
  return chai.request(app)
  .post('/api/accounts/logout')
  .set('Cookie', cookie)
  .send();
};

export const logIn = (app: Express) => {
  return chai.request(app)
  .post('/api/accounts/login')
  .send({
    'username': TEST_USER,
    'password': TEST_PASSWORD
  });
};

export const closeAccount = (app: Express, cookie: string) => {
  return chai.request(app)
  .post('/api/accounts/close_account')
  .set('Cookie', cookie)
  .send();
};

// ----------- \\ IMAGE // ----------- \\

export const createImage = (app: Express, referenceId: ObjectID) => {
  return chai.request(app)
  .post('/api/images')
  .field('referenceId', referenceId)
  .attach('file', 'tests/data/coke.jpg');
};


export const getImage = (app: Express, referenceId: ObjectID) => {
  return chai.request(app)
  .get(`/api/images/${referenceId}`)
  .send();
};

export const updateImage = (app: Express, referenceId: ObjectID) => {
  return chai.request(app)
  .put('/api/images')
  .field('referenceId', referenceId)
  .attach('file', 'tests/data/coke.jpg');
};


// ----------- \\ BAR // ----------- \\

export const createBar = (app: Express, cookie: string, userId: ObjectID, name: string) => {
  return chai.request(app)
  .post(`/api/bar`)
  .set('Cookie', cookie)
  .send({ userId, name });
};

export const getBar = (app: Express, cookie: string) => {
  return chai.request(app)
  .get(`/api/bar`)
  .set('Cookie', cookie)
  .send();
};

export const updateBar = (app: Express, cookie: string, action: 'add' | 'remove', ingredients: Array<ObjectID> ) => {
  return chai.request(app)
  .put(`/api/bar/${action}`)
  .set('Cookie', cookie)
  .send({ ingredients });
};

// ----------- \\ COCKTAIL // ----------- \\

export const createCocktail = (app: Express, cookie: string, cocktailParameters: {[key: string]: any} ) => {
  return chai.request(app)
  .post(`/api/cocktails`)
  .set('Cookie', cookie)
  .send({ ...cocktailParameters });
};

// ----------- \\ BOOKMARK // ----------- \\

export const createBookmark = (app: Express, cookie: string, item: ObjectID, type: string ) => {
  return chai.request(app)
  .post(`/api/bookmarks`)
  .set('Cookie', cookie)
  .send({ item, type });
};