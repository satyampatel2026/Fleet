import { createContext, useContext, useMemo, useState } from 'react';
import { storage } from '../utils/storage';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.getUser());
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      storage.setToken(data.token, credentials.remember);
      storage.setRefreshToken(data.refreshToken, credentials.remember);
      storage.setUser(data.user, credentials.remember);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    storage.clearAuth();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user && !!storage.getToken(),
      loading,
      login,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);