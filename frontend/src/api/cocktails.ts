import { API_URL } from './common';
import axios from "axios";

const COCKTAILS_API_URL = `${API_URL}/cocktails`;

const listCocktails = async (filters: {[key: string]: string}) => {
  return await axios.request({
    url: COCKTAILS_API_URL,
    method: 'get',
    params: filters
  });
};

const createCocktail = async (name: string, glass_type: string, ingredients: Array<{id: string, quantity: string}>, category: string,
  author?: string, characteristics?: {[key: string]: string}, description?: string) => {
  return await axios.post(COCKTAILS_API_URL, { name, glass_type, ingredients, category, author, characteristics, description });
};

const getCocktail = async (cocktailId: string) => {
  return await axios.post(`${COCKTAILS_API_URL}/${cocktailId}`);
};

const getCocktailFromBar = async (filters: {[key: string]: string}, ingredients?: Array<string>) => {
  return await axios.request({
    url: `${COCKTAILS_API_URL}/from_bar`,
    method: 'post',
    params: filters,
    data: { ingredients }
  });
};

export { listCocktails, createCocktail, getCocktail, getCocktailFromBar };
