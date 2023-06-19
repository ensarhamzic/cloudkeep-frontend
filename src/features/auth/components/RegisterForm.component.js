import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../../services/auth/authContext"
import {
  FormInput,
  FormView,
  AuthButton,
  AuthButtonSecondary,
} from "../../../styles/auth.styles"
import { Spacer } from "../../../components/Spacer.component"
import { InputError } from "../../../components/InputError.component"
import {
  registerRequest,
  registerGoogleRequest,
} from "../../../services/auth/auth.service"
import { useNavigation } from "@react-navigation/native"
import * as WebBrowser from "expo-web-browser"
// eslint-disable-next-line import/namespace
import * as Google from "expo-auth-session/providers/google"
import {
  ANDROID_GOOGLE_CLIENT_ID,
  IOS_GOOGLE_CLIENT_ID,
  EXPO_GOOGLE_CLIENT_ID,
} from "../../../../env"

export const RegisterForm = () => {
  const { onAuth, user } = useContext(AuthContext)
  const navigation = useNavigation()

  const [firstName, setFirstName] = useState("")
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastName, setLastName] = useState("")
  const [lastNameError, setLastNameError] = useState(null)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(null)
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState(null)

  const registerHandler = () => {
    setFormSubmitted(true)

    if (!firstName) setFirstNameError("First Name is required")
    else if (firstName.length < 2)
      setFirstNameError("Must be at least 2 characters long")
    else setFirstNameError(null)

    if (!lastName) setLastNameError("Last Name is required")
    else if (lastName.length < 2)
      setLastNameError("Must be at least 2 characters long")
    else setLastNameError(null)

    if (!email) setEmailError("Email is required")
    else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      setEmailError("Must be a valid email address")
    else setEmailError(null)

    if (!username) setUsernameError("Username is required")
    else if (username.length < 5)
      setUsernameError("Must be at least 5 characters long")
    else setUsernameError(null)

    if (!password) setPasswordError("Password is required")
    else if (password.length < 8)
      setPasswordError("Password must be at least 8 characters")
    else setPasswordError(null)

    if (!confirmPassword)
      setConfirmPasswordError("Confirm Password is required")
    else if (confirmPassword !== password)
      setConfirmPasswordError("Passwords must match")
    else setConfirmPasswordError(null)
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_GOOGLE_CLIENT_ID,
    androidClientId: ANDROID_GOOGLE_CLIENT_ID,
    expoClientId: EXPO_GOOGLE_CLIENT_ID,
  })

  useEffect(() => {
    ;(async () => {
      if (response?.type === "success") {
        const accessToken = response?.authentication?.accessToken
        if (!accessToken) return
        const rsp = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const userInfo = await rsp.json()
        const r = await registerGoogleRequest(userInfo)
        if (r.error) setRegisterError(r.message)
        else await onAuth(r)
      }
    })()
  }, [response])

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      setFormSubmitted(false)
      const canSendRequest =
        formSubmitted &&
        !firstNameError &&
        !lastNameError &&
        !emailError &&
        !usernameError &&
        !passwordError &&
        !confirmPasswordError
      if (canSendRequest) {
        setIsLoading(true)
        setRegisterError(null)
        const user = {
          firstName,
          lastName,
          email,
          username,
          password,
          confirmPassword,
        }
        const response = await registerRequest(user)
        if (response.error) setRegisterError(response.message)
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
        label="First Name"
        onChangeText={setFirstName}
        value={firstName}
        error={firstNameError}
        disabled={isLoading}
      />
      <InputError error={firstNameError} />
      <Spacer position="top" size="medium">
        <FormInput
          label="Last Name"
          onChangeText={setLastName}
          value={lastName}
          error={lastNameError}
          disabled={isLoading}
        />
        <InputError error={lastNameError} />
      </Spacer>

      <Spacer position="top" size="medium">
        <FormInput
          label="Email"
          onChangeText={setEmail}
          value={email}
          error={emailError}
          disabled={isLoading}
        />
        <InputError error={emailError} />
      </Spacer>
      <Spacer position="top" size="medium">
        <FormInput
          label="Username"
          onChangeText={setUsername}
          value={username}
          error={usernameError}
          disabled={isLoading}
        />
        <InputError error={usernameError} />
      </Spacer>
      <Spacer position="top" size="medium">
        <FormInput
          secureTextEntry
          label="Password"
          onChangeText={setPassword}
          value={password}
          error={passwordError}
          disabled={isLoading}
        />
        <InputError error={passwordError} />
      </Spacer>
      <Spacer position="top" size="medium">
        <FormInput
          secureTextEntry
          label="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          error={confirmPasswordError}
          disabled={isLoading}
        />
        <InputError error={confirmPasswordError} />
      </Spacer>
      <Spacer position="top" size="large">
        <AuthButton
          icon={!isLoading && "account-arrow-right"}
          mode="contained"
          onPress={registerHandler}
        >
          {isLoading ? "Signing you up..." : "Register"}
        </AuthButton>
      </Spacer>
      <Spacer position="top" size="large">
        <AuthButtonSecondary
          mode="outlined"
          icon="google"
          onPress={() => promptAsync()}
        >
          Sign with Google
        </AuthButtonSecondary>
      </Spacer>
      <InputError error={registerError} />
    </FormView>
  )
}
