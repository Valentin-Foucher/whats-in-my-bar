const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';
const API_HOST = process.env.REACT_APP_API_HOST || 'localhost:8080';

export const API_URL = `${API_PROTOCOL}://${API_HOST}/api`;
