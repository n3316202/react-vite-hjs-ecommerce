import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, loginUser } from "../api/AuthApi";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

  const getUser = async () => {
    try {
      const response = await getCurrentUser()      
      setUser(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("🙅 사용자 정보 불러오기 실패", error);
      logout(); // 토큰 만료되었을 경우
    }
  };

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);

      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      setAccessToken(access);

      await getUser(); // 로그인 후 유저 정보 로드
    } catch (error) {
      console.error("❌ 로그인 실패", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  const value = {
    user,
    accessToken,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};