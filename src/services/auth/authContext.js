import React, { useState, createContext } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const isAuth = !!user

  const onAuth = ({ user, token }) => {
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
        onAuth,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
