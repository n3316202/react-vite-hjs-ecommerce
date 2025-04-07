import React, { createContext, useState } from 'react';

//https://junhee6773.tistory.com/entry/react-useContext-%EA%B0%84%EB%8B%A8-%EB%B3%80%EA%B2%BD-%EB%B0%A9%EB%B2%95

// LoginContext 생성
const LoginContext = createContext();

// LoginProvider 컴포넌트
const LoginProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);


  const value = {
    state: { isLoggedIn, username },
    actions: { setIsLoggedIn, setUsername },
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export { LoginProvider, LoginContext };
