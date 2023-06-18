import React, { useContext, useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AuthNavigator } from "./auth.navigator"
import { AuthContext } from "../../services/auth/authContext"
import { AppNavigator } from "./app.navigator"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { verifyTokenRequest } from "../../services/auth/auth.service"
import {
  CenteredActivityIndicator,
  NotConnectedText,
  NotConnectedView,
} from "../../styles/ui.styles"
import NetInfo from "@react-native-community/netinfo"
import { UtilsContext } from "../../services/other/utils.context"

export const Navigation = () => {
  const { isConnected, setIsConnected } = useContext(UtilsContext)
  const [isInitial, setIsInitial] = useState(true)

  const { onAuth } = useContext(AuthContext)
  useEffect(() => {
    ;(async () => {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        const response = await verifyTokenRequest(token)
        if (!response.error) {
          onAuth(response)
          setIsInitial(false)
          return
        }
      }
      await AsyncStorage.removeItem("token")
      setIsInitial(false)
    })()
  }, [])

  const { user, isAuth } = useContext(AuthContext)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      {isConnected ? (
        <NavigationContainer>
          {isInitial && <CenteredActivityIndicator />}
          {!isInitial && isAuth && user.verified ? (
            <AppNavigator />
          ) : (
            !isInitial && <AuthNavigator />
          )}
        </NavigationContainer>
      ) : (
        <NotConnectedView>
          <NotConnectedText>
            No Internet Connection. Connect to the internet to continue
          </NotConnectedText>
        </NotConnectedView>
      )}
    </>
  )
}
