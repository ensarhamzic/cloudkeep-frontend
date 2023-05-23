import React, { useContext } from "react"
import { SafeArea } from "../../../styles/auth.styles"
import { AuthContext } from "../../../services/auth/authContext"
import { PrimaryButton } from "../../../styles/ui.styles"

export const SettingsScreen = () => {
  const { onLogout } = useContext(AuthContext)
  return (
    <>
      <SafeArea>
        <PrimaryButton onPress={onLogout}>Logout</PrimaryButton>
      </SafeArea>
    </>
  )
}
