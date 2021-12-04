import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";
import { api } from "../../services/api";

type AuthProvider = {
  children: ReactNode;
}

interface AuthResponse {
  token: string;
  user: IUser;
}

type AuthContextData = {
  user: IUser | null;
  signInUrl: string;
  signIn: (code: string) => void;
  signOut: () => void;
}

const LOCAL_STORAGE_KEY = '@dowhile:token';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<IUser | null>(null);
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=fe59c922ff04b5c79772`

  async function signIn(code: string) {
    const { data: { token, user: loadedUser } } = await api.post<AuthResponse>('authenticate', {
      code,
    });
    setUser(loadedUser);

    api.defaults.headers.common.authorization = `Bearer ${token}`;
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  function signOut() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUser(null);
  }

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    if (token) {
      api.get<IUser>('profile').then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, signInUrl, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("You must use this hook inside AuthProvider");

  return context;
}