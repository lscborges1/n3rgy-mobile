import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  IDHMAC: string;
  login: (IDHMAC: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [IDHMAC, setIDHMAC] = useState('');

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const IHDMAC = await AsyncStorage.getItem('@n3rgyMobile:IHDMAC');

      if (IHDMAC) {
        setIDHMAC(JSON.parse(IHDMAC));
      }
    }

    loadStorageData();
  }, []);

  async function login(IHDMAC: string): Promise<void> {
    setIDHMAC(IHDMAC);
    await AsyncStorage.setItem('@n3rgyMobile:IHDMAC', JSON.stringify(IHDMAC));
  }

  async function logout() {
    await AsyncStorage.removeItem('@n3rgyMobile:IHDMAC');
    setIDHMAC('');
  }

  return (
    <AuthContext.Provider value={{ IDHMAC, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
