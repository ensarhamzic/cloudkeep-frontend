import React, { useState, useEffect } from "react"
import { AuthButton, FormView } from "../../../styles/auth.styles"
import { TextInput } from "react-native-paper"
import { InputError } from "../../../components/InputError.component"
import { Spacer } from "../../../components/Spacer.component"
import { resetPassword } from "../../../services/auth/auth.service"
import Toast from "react-native-root-toast"

export const ResetPasswordForm = ({ onPasswordReset, email }) => {
  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState(null)

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState(null)

  const verifyHandler = () => {
    setFormSubmitted(true)
    if (!code) setCodeError("Code is required")
    else if (code.length !== 6) setCodeError("Code must be 6 characters long")
    else setCodeError(null)

    if (!password) setPasswordError("Password is required")
    else if (password.length < 8)
      setPasswordError("Password must be at least 8 characters long")
    else setPasswordError(null)
  }

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      setFormSubmitted(false)
      if (formSubmitted && !codeError) {
        setIsLoading(true)
        setError(null)
        const response = await resetPassword(email, code, password)
        if (response.error) {
          setError(response.message)
          setIsLoading(false)
          return
        }
        setIsLoading(false)
        Toast.show("Password reset successfully", {
          duration: Toast.durations.LONG,
        })
        onPasswordReset()
      }
    })()
  }, [formSubmitted, codeError, code, password, email])

  return (
    <FormView>
      <TextInput
        label="Code"
        value={code}
        onChangeText={setCode}
        error={codeError}
        disabled={isLoading}
        inputMode="numeric"
      />
      <InputError error={codeError} />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        error={passwordError}
        secureTextEntry
        disabled={isLoading}
      />
      <InputError error={passwordError} />

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
