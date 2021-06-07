
import { API_URL } from './common';
import axios from 'axios';

const SEARCH_API_URL = `${API_URL}/search`;

const search = async (query: string) => {
  return await axios.request({
    url: SEARCH_API_URL,
    method: 'get',
    params: { query }
  });
};

export { search };
