import { API_URL } from './common';
import axios from "axios";

const BARS_API_URL = `${API_URL}/bars`;

const getBar = async () => {
  return await axios.get(BARS_API_URL);
};

const createBar = async (name: string) => {
  return await axios.post(BARS_API_URL, { name });
};

const addToBar = async (ingredients: Array<string>) => {
  return await axios.post(`${BARS_API_URL}/add`, { ingredients });
};

const removeFromBar = async (ingredients: Array<string>) => {
  return await axios.post(`${BARS_API_URL}/remove`, { ingredients });
};

export { getBar, createBar, addToBar, removeFromBar };