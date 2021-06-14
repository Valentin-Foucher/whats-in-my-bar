import { API_URL } from './common';
import axios from 'axios';

const ACCOUNTS_API_URL = `${API_URL}/accounts`;

const signup = async (username: string, password: string, email: string) => {
  return await axios.post(`${ACCOUNTS_API_URL}/signup`, { username, password, email });
};

const login = async (username: string, password: string) => {
  return await axios.post(`${ACCOUNTS_API_URL}/login`, { username, password });
};

const logOut = async () => {
  return await axios.post(`${ACCOUNTS_API_URL}/logout`);
};

const closeAccount = async () => {
  return await axios.post(`${ACCOUNTS_API_URL}/close_account`);
};

export { signup, login, logOut, closeAccount };
