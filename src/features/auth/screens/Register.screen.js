import React from "react"
import {
  AuthHeadline,
  AuthScrollView,
  LinkText,
  SafeArea,
} from "../components/auth.styles"
import { Spacer } from "../../../components/Spacer.component"
import { FullLogo } from "../../../components/FullLogo.component"
import { RegisterForm } from "../components/RegisterForm.component"

export const RegisterScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <AuthScrollView>
        <FullLogo height={130} />
        <Spacer position="top" size="large">
          <AuthHeadline>Create an account</AuthHeadline>
        </Spacer>
        <Spacer size="large" />
        <RegisterForm />
        <Spacer position="top" size="large">
          <LinkText
            onPress={() => {
              navigation.navigate("Login")
            }}
          >
            Already have an account? Sign in
          </LinkText>
        </Spacer>
        <Spacer size="xl" />
      </AuthScrollView>
    </SafeArea>
  )
}
