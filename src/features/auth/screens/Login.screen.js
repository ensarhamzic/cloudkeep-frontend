import React from "react"
import {
  AuthHeadline,
  FormView,
  LinkText,
  SafeArea,
  AuthScrollView,
  AuthButton,
} from "../components/auth.styles"
import { TextInput } from "react-native-paper"
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
              navigation.navigate("Register")
            }}
          >
            Don't have an account? Sign Up
          </LinkText>
        </Spacer>
      </AuthScrollView>
    </SafeArea>
  )
}
