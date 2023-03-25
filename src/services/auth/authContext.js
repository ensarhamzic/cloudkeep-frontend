import React, { useState, createContext } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const isAuth = !!user

  const onLogin = ({ user, token }) => {
    setUser(user)
    setToken(token)
  }

  const onLogout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        token,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
