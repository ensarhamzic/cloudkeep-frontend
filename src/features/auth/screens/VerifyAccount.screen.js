import React, { useContext } from "react"
import {
  AuthHeadline,
  AuthScrollView,
  AuthSubHeadline,
  SafeArea,
} from "../components/auth.styles"
import { AuthContext } from "../../../services/auth/authContext"
import { FullLogo } from "../../../components/FullLogo.component"
import { Spacer } from "../../../components/Spacer.component"
import { Text } from "react-native"
import { VerifyAccountForm } from "../components/VerifyAccountForm.component"

export const VerifyAccountScreen = () => {
  const { user } = useContext(AuthContext)
  return (
    <SafeArea>
      <AuthScrollView>
        <FullLogo height={130} />
        <Spacer position="top" size="large">
          <AuthHeadline>Verify your account</AuthHeadline>
        </Spacer>
        <Spacer position={"bottom"} size={"large"}>
          <AuthSubHeadline>
            Please enter code sent on {user.email}
          </AuthSubHeadline>
        </Spacer>
        <VerifyAccountForm />
        <Spacer size="large" />
      </AuthScrollView>
    </SafeArea>
  )
}
