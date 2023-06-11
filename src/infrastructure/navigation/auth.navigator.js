import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { LoginScreen } from "../../features/auth/screens/Login.screen"
import { RegisterScreen } from "../../features/auth/screens/Register.screen"
import { VerifyAccountScreen } from "../../features/auth/screens/VerifyAccount.screen"
import { ForgotPasswordScreen } from "../../features/auth/screens/ForgotPassword.screen"
import { ResetPasswordScreen } from "../../features/auth/screens/ResetPassword.screen"

const Stack = createStackNavigator()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccountScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}
