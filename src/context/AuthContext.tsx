import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, createContext, useContext, useEffect, ReactNode} from 'react';

interface User {
  token: string;
  user: {
    id: any;
    name: string;
  };
}

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextValue | any>(undefined);

export function useAuth() {
  return useContext(UserContext);
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({children}: UserProviderProps) {
  const [user, setUser] = useState<User | any>({
    token: '',
    user: {
      id: '',
      name: '',
    },
  });
  const [isSignedin, setIsSignedin] = useState(false);

  const getUser = () => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token !== null || '') {
          setIsSignedin(true);
        }
      })
      .catch((err: any) => console.log(err));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setIsSignedin(false);
  };

  return (
    <UserContext.Provider value={{user, setUser, isSignedin, getUser, logout}}>
      {children}
    </UserContext.Provider>
  );
}
