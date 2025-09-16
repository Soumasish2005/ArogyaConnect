import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type Role = "patient" | "doctor" | "shop" | "hospital" | null;

interface AuthContextProps {
  token: string | null;
  role: Role;
  login: (token: string, role: Role) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  role: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const load = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedRole = await AsyncStorage.getItem("role");
      if (storedToken && storedRole) {
        setToken(storedToken);
        setRole(storedRole as Role);
      }
    };
    load();
  }, []);

  const login = async (jwt: string, userRole: Role) => {
    setToken(jwt);
    setRole(userRole);
    await AsyncStorage.setItem("token", jwt);
    await AsyncStorage.setItem("role", userRole!);
  };

  const logout = async () => {
    setToken(null);
    setRole(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
