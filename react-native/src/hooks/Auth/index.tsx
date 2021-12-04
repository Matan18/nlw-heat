import React, {
  useContext,
  useState,
  createContext, ReactNode
} from "react";
import * as AuthSessions from "expo-auth-session";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const CLIENT_ID = 'fe59c922ff04b5c79772';
const SCOPE = 'read:user';
const TOKEN_STORAGE_KEY = '@dowhile:token';
const USER_STORAGE_KEY = '@dowhile:user';

type AuthProvider = {
  children: ReactNode;
}

interface AuthResponse {
  token: string;
  user: IUser;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  },
  type?: string;
}

type AuthContextData = {
  user: IUser | null;
  isSigningIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);
  const authUrl = `https://github.com/login/oauth/authorize?scope=${SCOPE}&client_id=${CLIENT_ID}`


  async function signIn() {
    setIsSigningIn(true);
    try {

      const { params: { code, error }, type } = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success' && error !== 'access_denied') {
        const { data: { token, user: fetchedUser } } = await api.post<AuthResponse>('/authenticate', { code });

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fetchedUser));
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);


        setUser(fetchedUser);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }
    }
    loadUserStorageData().finally(() => {
      setIsSigningIn(false);
    })
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isSigningIn }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("You must use this hook inside AuthProvider");

  return context;
}
