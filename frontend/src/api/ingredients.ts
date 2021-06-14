
import { API_URL } from './common';
import axios from 'axios';

const INGREDIENTS_API_URL = `${API_URL}/ingredients`;

const listIngredients = async () => {
  return await axios.get(INGREDIENTS_API_URL);
};

const getIngredient = async (ingredientId: string) => {
  return await axios.get(`${INGREDIENTS_API_URL}/${ingredientId}`);
};

export { listIngredients, getIngredient };
