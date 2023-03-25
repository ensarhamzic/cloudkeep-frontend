import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../../services/auth/authContext"
import { TextInput } from "react-native-paper"
import { Spacer } from "../../../components/Spacer.component"
import { ErrorView, FormView, ErrorText } from "./auth.styles"
import { AuthButton } from "./auth.styles"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useTheme } from "styled-components"
import { loginRequest } from "../../../services/auth/auth.service"

export const LoginForm = () => {
  const theme = useTheme()
  const { onLogin, isAuth } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(null)

  console.log(isAuth)

  const signInHandler = () => {
    setFormSubmitted(true)
    if (!username) setUsernameError("Username is required")
    else if (username.length < 5)
      setUsernameError("Must be at least 5 characters long")
    else setUsernameError(null)

    if (!password) setPasswordError("Password is required")
    else if (password.length < 8)
      setPasswordError("Password must be at least 8 characters")
    else setPasswordError(null)
  }

  useEffect(() => {
    ;(async () => {
      setFormSubmitted(false)
      if (formSubmitted && !usernameError && !passwordError) {
        setIsLoading(true)
        setLoginError(null)
        const response = await loginRequest(username, password)
        if (response.error) setLoginError(response.message)
        else onLogin(response)
        setIsLoading(false)
      }
    })()
  }, [formSubmitted, usernameError, passwordError])

  return (
    <FormView>
      <TextInput
        onChangeText={setUsername}
        value={username}
        label={"Username"}
        error={usernameError}
        disabled={isLoading}
      />
      {usernameError && (
        <>
          <Spacer position="top" size="medium">
            <ErrorView>
              <Icon name="error" size={25} color={theme.colors.error} />
              <Spacer position="left" size="small">
                <ErrorText>{usernameError}</ErrorText>
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
          disabled={isLoading}
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
          icon={!isLoading && "account-arrow-right"}
          mode="contained"
          onPress={signInHandler}
        >
          {isLoading ? "Signing you in..." : "Sign In"}
        </AuthButton>
      </Spacer>
      {loginError && (
        <Spacer position="top" size="medium">
          <ErrorView>
            <Icon name="error" size={25} color={theme.colors.error} />

            <Spacer position="left" size="small">
              <ErrorText>{loginError}</ErrorText>
            </Spacer>
          </ErrorView>
        </Spacer>
      )}
    </FormView>
  )
}
