import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../../services/auth/authContext"
import { Spacer } from "../../../components/Spacer.component"
import { FormInput, FormView, AuthButton } from "../../../styles/auth.styles"
import { loginRequest } from "../../../services/auth/auth.service"
import { InputError } from "../../../components/InputError.component"
import { useNavigation } from "@react-navigation/native"

export const LoginForm = () => {
  const navigation = useNavigation()

  const { onAuth, user } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(null)

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
      if (isLoading) return
      setFormSubmitted(false)
      if (formSubmitted && !usernameError && !passwordError) {
        setIsLoading(true)
        setLoginError(null)
        const response = await loginRequest(username, password)
        if (response.error) setLoginError(response.message)
        else await onAuth(response)
        setIsLoading(false)
      }
    })()
  }, [formSubmitted, usernameError, passwordError])

  const notVerified = user?.verified === false
  useEffect(() => {
    if (notVerified) navigation.replace("VerifyAccount")
  }, [notVerified])

  return (
    <FormView>
      <FormInput
        onChangeText={setUsername}
        value={username}
        label="Username"
        error={usernameError}
        disabled={isLoading}
      />
      <InputError error={usernameError} />
      <Spacer position="top" size="medium">
        <FormInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          label="Password"
          error={passwordError}
          disabled={isLoading}
        />
        <InputError error={passwordError} />
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
      <InputError error={loginError} />
    </FormView>
  )
}
