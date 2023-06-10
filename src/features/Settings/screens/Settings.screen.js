import React, { useContext } from "react"
import { SafeArea } from "../../../styles/auth.styles"
import { AuthContext } from "../../../services/auth/authContext"
import { PrimaryButton, SecondaryButton } from "../../../styles/ui.styles"
import { Spacer } from "../../../components/Spacer.component"

export const SettingsScreen = ({ navigation }) => {
  const { onLogout } = useContext(AuthContext)

  const trashPressHandler = () => {
    navigation.navigate("Trash")
  }
  return (
    <>
      <SafeArea>
        <SecondaryButton onPress={trashPressHandler} icon="trash-can-outline">
          Trash
        </SecondaryButton>
        <Spacer size="medium">
          <PrimaryButton onPress={onLogout}>Logout</PrimaryButton>
        </Spacer>
      </SafeArea>
    </>
  )
}
