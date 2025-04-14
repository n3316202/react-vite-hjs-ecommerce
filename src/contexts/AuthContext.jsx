import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, loginUser } from '../api/AuthApi'
import { useCart } from './CartContext'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access'))

  //dev_6
  const { loadCart, clearCart } = useCart() // ✅ 장바구니 불러오기 훅 가져오기

  useEffect(() => {
    if (accessToken) {
      getUser()
    }
  }, [accessToken])

  const getUser = async () => {
    try {
      const response = await getCurrentUser()
      setUser(response.data)
      console.log('겟유져')
      console.log(response.data)
    } catch (error) {
      console.error('🙅 사용자 정보 불러오기 실패', error)
      await logout() // 토큰 만료되었을 경우
    }
  }

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password)

      const { access, refresh } = response.data
      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)
      setAccessToken(access)

      await getUser() // 로그인 후 유저 정보 로드
      //dev_6
      await loadCart() // ✅ 로그인 후 장바구니 즉시 불러오기!
    } catch (error) {
      console.error('❌ 로그인 실패', error)
      throw error
    }
  }

  const logout = async () => {
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')

    await clearCart() // ✅ 장바구니 초기화 로그아웃시 카트 초기화(아이콘을 0 으로)
  }

  const value = {
    user,
    accessToken,
    login,
    logout,
    getUser,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
