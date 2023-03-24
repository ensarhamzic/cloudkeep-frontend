import React, { useState, useEffect } from "react"
import { TextInput } from "react-native-paper"
import { Text } from "react-native"
import { Spacer } from "../../../components/Spacer.component"
import { ErrorView, FormView, ErrorText } from "./auth.styles"
import { AuthButton } from "./auth.styles"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useTheme } from "styled-components"

export const LoginForm = () => {
  const theme = useTheme()
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [emailUsernameError, setEmailUsernameError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const [isTouched, setIsTouched] = useState(false)

  const signInHandler = () => {
    setIsTouched(true)
    if (!emailOrUsername) {
      setEmailUsernameError("This field is required")
    } else if (emailOrUsername.length < 5) {
      setEmailUsernameError("Must be at least 5 characters long")
    } else {
      setEmailUsernameError(null)
    }

    if (!password) {
      setPasswordError("Password is required")
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
    } else {
      setPasswordError(null)
    }
  }

  useEffect(() => {
    if (isTouched && !emailUsernameError && !passwordError) {
      console.log("Send request to server")
    }
  }, [isTouched, emailUsernameError, passwordError])

  return (
    <FormView>
      <TextInput
        onChangeText={setEmailOrUsername}
        value={emailOrUsername}
        label={"Email or username"}
        error={emailUsernameError}
      />
      {emailUsernameError && (
        <>
          <Spacer position="top" size="medium">
            <ErrorView>
              <Icon name="error" size={25} color={theme.colors.error} />
              <Spacer position="left" size="small">
                <ErrorText>{emailUsernameError}</ErrorText>
              </Spacer>
            </ErrorView>
          </Spacer>
          <Spacer size="medium" />
        </>
      )}
      <Spacer position="top" size="medium">
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          label="Password"
          error={passwordError}
        />
        {passwordError && (
          <>
            <Spacer position="top" size="medium">
              <ErrorView>
                <Icon name="error" size={25} color={theme.colors.error} />
                <Spacer position="left" size="small">
                  <ErrorText>{passwordError}</ErrorText>
                </Spacer>
              </ErrorView>
            </Spacer>
          </>
        )}
      </Spacer>
      <Spacer position="top" size="large">
        <AuthButton
          icon="account-arrow-right"
          mode="contained"
          onPress={signInHandler}
        >
          Sign in
        </AuthButton>
      </Spacer>
    </FormView>
  )
}
