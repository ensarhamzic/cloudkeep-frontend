import React, { useState } from "react"
import { TextInput } from "react-native-paper"
import { Spacer } from "../../../components/Spacer.component"
import { FormView } from "./auth.styles"
import { AuthButton } from "./auth.styles"

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)

  return (
    <FormView>
      <TextInput onChangeText={setEmail} value={email} label="Email" />
      <Spacer position="top" size="medium">
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          label="Password"
        />
      </Spacer>
      <Spacer position="top" size="large">
        <AuthButton icon="account-arrow-right" mode="contained">
          Sign in
        </AuthButton>
      </Spacer>
    </FormView>
  )
}
