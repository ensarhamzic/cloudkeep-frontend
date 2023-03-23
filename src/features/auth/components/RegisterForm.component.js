import React from "react"
import { FormView } from "./auth.styles"
import { TextInput } from "react-native-paper"
import { Spacer } from "../../../components/Spacer.component"
import { AuthButton } from "./auth.styles"

export const RegisterForm = () => {
  return (
    <FormView>
      <TextInput label="First Name" />
      <Spacer position="top" size="medium">
        <TextInput label="Last Name" />
      </Spacer>
      <Spacer position="top" size="medium">
        <TextInput label="Email" />
      </Spacer>
      <Spacer position="top" size="medium">
        <TextInput label="Username" />
      </Spacer>
      <Spacer position="top" size="medium">
        <TextInput secureTextEntry={true} label="Password" />
      </Spacer>
      <Spacer position="top" size="medium">
        <TextInput secureTextEntry={true} label="Confirm Password" />
      </Spacer>
      <Spacer position="top" size="large">
        <AuthButton icon="account-arrow-right" mode="contained">
          Sign in
        </AuthButton>
      </Spacer>
    </FormView>
  )
}
