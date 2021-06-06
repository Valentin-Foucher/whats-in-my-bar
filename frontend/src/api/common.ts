const API_PROTOCOL = process.env.API_PROTOCOL || "http";
const API_HOST = process.env.API_HOST || "localhost";
const API_PORT = process.env.API_PORT || "8080";

export const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/api`;
