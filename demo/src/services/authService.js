const MOCK_USER = {
  id: 1,
  name: 'Admin User',
  email: 'admin@fleet.com',
  role: 'Super Admin',
  avatar: null,
};

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export default {
  async login({ email, password, remember }) {
    await delay();
    if (email === 'admin@fleet.com' && password === 'Admin@123') {
      return {
        token: 'mock-jwt-access-token',
        refreshToken: 'mock-jwt-refresh-token',
        user: MOCK_USER,
        remember,
      };
    }
    throw { response: { data: { message: 'Invalid email or password' } } };
  },
  async forgotPassword(email) {
    await delay();
    return { message: 'Reset link sent to your email' };
  },
  async resetPassword(payload) {
    await delay();
    return { message: 'Password reset successful' };
  },
};