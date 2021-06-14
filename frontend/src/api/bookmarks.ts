
import { API_URL } from './common';
import axios from 'axios';

const BOOKMARKS_API_URL = `${API_URL}/bookmarks`;

const listBookmarks = async () => {
  return await axios.get(BOOKMARKS_API_URL);
};

const createBookmark = async (item: string, type: string) => {
  return await axios.post(BOOKMARKS_API_URL, { item, type });
};

const removeBookmark = async (id: string) => {
  return await axios.delete(`BOOKMARKS_API_URL/${id}`);
};

export { listBookmarks, createBookmark, removeBookmark };
