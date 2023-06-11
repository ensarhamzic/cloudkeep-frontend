import React from "react"
import {
  AuthHeadline,
  AuthScrollView,
  AuthSubHeadline,
  SafeArea,
} from "../../../styles/auth.styles"
import { FullLogo } from "../../../components/FullLogo.component"
import { Spacer } from "../../../components/Spacer.component"
import { ForgotPasswordForm } from "../components/ForgotPasswordForm.component"

export const ForgotPasswordScreen = ({ navigation }) => {
  const forgotPasswordHandler = (email) => {
    navigation.navigate("ResetPassword", { email })
  }
  return (
    <SafeArea>
      <AuthScrollView>
        <FullLogo height={130} />
        <Spacer position="top" size="large">
          <AuthHeadline>Enter your email</AuthHeadline>
        </Spacer>
        <ForgotPasswordForm onForgot={forgotPasswordHandler} />
        <Spacer size="large" />
      </AuthScrollView>
    </SafeArea>
  )
}
