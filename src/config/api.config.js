const API_CONFIG = {
  BASE_URL: 'https://localhost:7130',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/api/auth/register',
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REFRESH_TOKEN: '/api/auth/refresh-token',
      ME: '/api/auth/me'
    }
  }
};

export default API_CONFIG;