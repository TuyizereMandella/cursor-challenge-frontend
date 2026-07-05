import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getSession,
  loginUser,
  logoutUser,
  registerUser,
} from "@/data/authStore";
import type { AuthUser, LoginInput, RegisterInput, UserRole } from "@/types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (input: LoginInput, role: UserRole) => Promise<AuthUser>;
  register: (input: RegisterInput, role: UserRole) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getSession());

  const login = useCallback(async (input: LoginInput, role: UserRole) => {
    const authUser = loginUser(input, role);
    setUser(authUser);
    return authUser;
  }, []);

  const register = useCallback(async (input: RegisterInput, role: UserRole) => {
    const authUser = registerUser(input, role);
    setUser(authUser);
    return authUser;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
