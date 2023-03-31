import React, { useState, createContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const isAuth = !!user

  const onAuth = async ({ user, token }) => {
    setUser(user)
    setToken(token)
    await AsyncStorage.setItem("token", token)
  }

  const onLogout = async () => {
    setUser(null)
    setToken(null)
    await AsyncStorage.removeItem("token")
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
