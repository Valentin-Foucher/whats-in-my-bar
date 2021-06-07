
import { API_URL } from './common';
import axios from 'axios';

const ARTICLES_API_URL = `${API_URL}/articles`;

const listArticles = async () => {
  return await axios.get(ARTICLES_API_URL);
};

const getArticle = async (articleId: string) => {
  return await axios.get(`${ARTICLES_API_URL}/${articleId}`);
};

export { listArticles, getArticle };
