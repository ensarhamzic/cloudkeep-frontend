import React from "react"
import {
  AuthHeadline,
  AuthScrollView,
  SafeArea,
} from "../../../styles/auth.styles"
import { FullLogo } from "../../../components/FullLogo.component"
import { Spacer } from "../../../components/Spacer.component"
import { ResetPasswordForm } from "../components/ResetPasswordForm.component"

export const ResetPasswordScreen = ({ navigation, route }) => {
  const email = route?.params?.email
  const passwordResetHandler = () => {
    navigation.navigate("Login")
  }
  return (
    <SafeArea>
      <AuthScrollView>
        <FullLogo height={130} />
        <Spacer position="top" size="large">
          <AuthHeadline>Reset Password</AuthHeadline>
        </Spacer>
        <ResetPasswordForm
          email={email}
          onPasswordReset={passwordResetHandler}
        />
        <Spacer size="large" />
      </AuthScrollView>
    </SafeArea>
  )
}
