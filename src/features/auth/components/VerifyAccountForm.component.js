import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../../services/auth/authContext"
import { AuthButton, FormView } from "./auth.styles"
import { TextInput } from "react-native-paper"
import { InputError } from "../../../components/InputError.component"
import { Spacer } from "../../../components/Spacer.component"
import { verifyEmailRequest } from "../../../services/auth/auth.service"

export const VerifyAccountForm = () => {
  const { user, onAuth } = useContext(AuthContext)

  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState(null)

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [verifyError, setVerifyError] = useState(null)

  const verifyHandler = () => {
    setFormSubmitted(true)
    if (!code) setCodeError("Code is required")
    else if (code.length !== 6) setCodeError("Code must be 6 characters long")
    else setCodeError(null)
  }

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      setFormSubmitted(false)
      if (formSubmitted && !codeError) {
        setIsLoading(true)
        setVerifyError(null)
        const response = await verifyEmailRequest(user.email, code)
        if (response.error) setVerifyError(response.message)
        else await onAuth(response)
        setIsLoading(false)
      }
    })()
  }, [formSubmitted, codeError])

  return (
    <FormView>
      <TextInput
        label={"Verification Code"}
        value={code}
        onChangeText={setCode}
        error={codeError}
        disabled={isLoading}
        inputMode="numeric"
      />
      <InputError error={codeError} />
      <Spacer position="top" size="large">
        <AuthButton
          icon={!isLoading && "account-arrow-right"}
          mode="contained"
          onPress={verifyHandler}
        >
          {isLoading ? "Verifying..." : "Verify account"}
        </AuthButton>
      </Spacer>
      <InputError error={verifyError} />
    </FormView>
  )
}
