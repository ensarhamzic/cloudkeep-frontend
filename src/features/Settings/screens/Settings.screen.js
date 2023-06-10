import React, { useContext } from "react"
import { SafeArea } from "../../../styles/auth.styles"
import { AuthContext } from "../../../services/auth/authContext"
import { PrimaryButton, SecondaryButton } from "../../../styles/ui.styles"
import { Spacer } from "../../../components/Spacer.component"
import { ProgressBar } from "react-native-paper"

export const SettingsScreen = ({ navigation }) => {
  const { onLogout } = useContext(AuthContext)

  const trashPressHandler = () => {
    navigation.navigate("Trash")
  }
  return (
    <>
      <SafeArea>
        <ProgressBar progress={0.5} color="#5E72E4" />
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
