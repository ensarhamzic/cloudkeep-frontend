import React, { useState, useEffect } from "react"
import { AuthButton, FormView } from "../../../styles/auth.styles"
import { TextInput } from "react-native-paper"
import { InputError } from "../../../components/InputError.component"
import { Spacer } from "../../../components/Spacer.component"
import { forgotPassword } from "../../../services/auth/auth.service"

export const ForgotPasswordForm = ({ onForgot }) => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(null)

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState(null)

  const verifyHandler = () => {
    setFormSubmitted(true)
    if (!email) setEmailError("Email is required")
    else if (!/\S+@\S+\.\S+/.test(email)) setEmailError("Email is invalid")
    else setEmailError(null)
  }

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      setFormSubmitted(false)
      if (formSubmitted && !emailError) {
        setIsLoading(true)
        setError(null)
        const response = await forgotPassword(email)
        if (response.error) {
          setError(response.message)
          setIsLoading(false)
          return
        }
        setIsLoading(false)
        onForgot(email)
      }
    })()
  }, [formSubmitted, emailError])

  return (
    <FormView>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={emailError}
        disabled={isLoading}
      />
      <InputError error={emailError} />
      <InputError error={error} />
      <Spacer position="top" size="large">
        <AuthButton
          icon={!isLoading && "account-arrow-right"}
          mode="contained"
          onPress={verifyHandler}
        >
          {isLoading ? "Loading..." : "Reset Password"}
        </AuthButton>
      </Spacer>
    </FormView>
  )
}
