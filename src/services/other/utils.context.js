import React, { useState, createContext } from "react"

export const UtilsContext = createContext()

export const UtilsContextProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true)

  return (
    <UtilsContext.Provider
      value={{
        isConnected,
        setIsConnected,
      }}
    >
      {children}
    </UtilsContext.Provider>
  )
}
