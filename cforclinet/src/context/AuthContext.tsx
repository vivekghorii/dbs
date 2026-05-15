import React, { createContext, useContext, useState } from "react";
import api from "../services/axios";

type Role = "ADMIN" | "USER";

interface AuthContextType {
  token: string | null;
  role: Role | null;
  name: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [role, setRole] = useState<Role | null>(
    localStorage.getItem("role") as Role
  );
  const [name, setName] = useState<string | null>(
    localStorage.getItem("name")
  );

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    const { token, role, name } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);

    setToken(token);
    setRole(role);
    setName(name);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setName(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
