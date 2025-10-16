import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('lexical_spark_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('lexical_spark_users') || '[]');
    
    if (users.find((u: any) => u.username === username)) {
      return false; // User already exists
    }
    
    users.push({ username, password });
    localStorage.setItem('lexical_spark_users', JSON.stringify(users));
    return true;
  };

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('lexical_spark_users') || '[]');
    const foundUser = users.find(
      (u: any) => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const userData = { username: foundUser.username };
      setUser(userData);
      localStorage.setItem('lexical_spark_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lexical_spark_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
