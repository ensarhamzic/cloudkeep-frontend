import React from "react"
import {
  AuthHeadline,
  LinkText,
  SafeArea,
  AuthScrollView,
} from "../../../styles/auth.styles"
import { Spacer } from "../../../components/Spacer.component"
import { FullLogo } from "../../../components/FullLogo.component"
import { LoginForm } from "../components/LoginForm.component"

export const LoginScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <AuthScrollView>
        <FullLogo height={130} />
        <Spacer position="top" size="large">
          <AuthHeadline>Sign in to your account</AuthHeadline>
        </Spacer>
        <Spacer size="large" />
        <LoginForm />
        <Spacer position="top" size="large">
          <LinkText
            onPress={() => {
              navigation.replace("Register")
            }}
          >
            Don't have an account? Sign Up
          </LinkText>
          <LinkText
            onPress={() => {
              navigation.replace("ForgotPassword")
            }}
          >
            Forgot Password?
          </LinkText>
        </Spacer>
      </AuthScrollView>
    </SafeArea>
  )
}
