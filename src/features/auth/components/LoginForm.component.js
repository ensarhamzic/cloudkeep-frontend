import React from "react"
import { TextInput } from "react-native-paper"
import { Spacer } from "../../../components/Spacer.component"
import { FormView } from "./auth.styles"
import { AuthButton } from "./auth.styles"

export const LoginForm = () => {
  return (
    <FormView>
      <TextInput label="Email" />
      <Spacer position="top" size="medium">
        <TextInput secureTextEntry={true} label="Password" />
      </Spacer>
      <Spacer position="top" size="large">
        <AuthButton icon="account-arrow-right" mode="contained">
          Sign in
        </AuthButton>
      </Spacer>
    </FormView>
  )
}
