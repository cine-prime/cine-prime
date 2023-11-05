import { createContext, useState } from 'react'
import Api from '@src/services/Api'
import { useEffect } from 'react'

export const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (storedUser) {
        Api.defaults.headers['Authorization'] = `Bearer ${storedUser.token}`
        setUser(storedUser)

      }
    }
  }, [user])

  async function signIn(email, password) {
    try {
      const { data } = await Api.post("/auth", {
        email: email,
        password: password,
      });

      setUser(data.user)
      
      Api.defaults.headers['Authorization'] = `Bearer ${data.user.token}`

      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (error) {
      throw error;
    }
  }

  function signOut() {
    localStorage.removeItem('user')
    setUser(null)  
    Api.defaults.headers['Authorization'] = undefined
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}