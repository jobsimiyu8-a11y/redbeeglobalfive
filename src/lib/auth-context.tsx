import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  role: "user" | "provider" | "agency";
  isVerified: boolean;
  isOnline: boolean;
  location: { lat: number; lng: number } | null;
  followers: number;
  following: number;
  phone?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (data: Partial<User>) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const defaultUser: User = {
  id: "u1",
  username: "johndoe",
  displayName: "John Doe",
  avatar: "",
  coverPhoto: "",
  bio: "Digital creator & entrepreneur 🚀",
  role: "user",
  isVerified: false,
  isOnline: true,
  location: { lat: -1.2921, lng: 36.8219 },
  followers: 234,
  following: 189,
  email: "john@example.com",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);

  const login = (_email: string, _password: string) => setUser(defaultUser);
  const register = (_data: Partial<User>) => setUser(defaultUser);
  const logout = () => setUser(null);
  const updateProfile = (data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
