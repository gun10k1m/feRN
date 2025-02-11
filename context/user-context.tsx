import React, {useEffect, useState} from 'react';
import {User} from '../interface/db-entity.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDB} from './db-context';

type UserContextType = {
  user: User | null;
  login: ({id, password}: {id: string; password: string}) => void;
  logout: () => void;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

function useUser(): UserContextType {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useStore must be used within an UserProvider');
  }
  return context;
}

const UserProvider = (props: {
  children: React.ReactNode;
}): React.ReactElement => {
  const {db} = useDB();
  const [user, setUser] = useState<User | null>(null);

  const login = ({id, password}: {id: string; password: string}) => {
    const loggedUser = db.login({id, password});
    if (loggedUser) {
      setUser(loggedUser);
      console.log('로컬에 유저정보 저장');
      AsyncStorage.setItem('logged-user', JSON.stringify(loggedUser));
    } else {
      console.log('로그인 실패 : 유저를 찾을 수 없습니다.');
    }
  };

  const logout = () => {
    AsyncStorage.removeItem('logged-user');
    setUser(null);
  };

  const checkPreviousLogin = async () => {
    const isUserPreviousLogged = await AsyncStorage.getItem('logged-user');
    if (isUserPreviousLogged) {
      setUser(JSON.parse(isUserPreviousLogged));
    }
  };

  useEffect(() => {
    console.log('already login');
    checkPreviousLogin();
  }, []);

  return <UserContext.Provider {...props} value={{user, login, logout}} />;
};

export {UserProvider, useUser};
