import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  IHDMAC: string;
  login: (IHDMAC: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [IHDMAC, setIDHMAC] = useState('');

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const cachedIHDMAC = await AsyncStorage.getItem('@n3rgyMobile:IHDMAC');

      if (cachedIHDMAC) {
        api.defaults.headers.common.Authorization = JSON.parse(cachedIHDMAC);
        setIDHMAC(JSON.parse(cachedIHDMAC));
      }
    }

    loadStorageData();
  }, []);

  async function login(inputIHDMAC: string): Promise<void> {
    setIDHMAC(inputIHDMAC);
    await AsyncStorage.setItem('@n3rgyMobile:IHDMAC', JSON.stringify(IHDMAC));
  }

  async function logout() {
    setIDHMAC('');
    await AsyncStorage.removeItem('@n3rgyMobile:IHDMAC');
  }

  return (
    <AuthContext.Provider value={{ IHDMAC, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
