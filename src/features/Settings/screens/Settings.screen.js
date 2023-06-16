import React, { useContext, useEffect, useState } from "react"
import { SafeArea } from "../../../styles/auth.styles"
import { AuthContext } from "../../../services/auth/authContext"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import {
  DriveSpaceView,
  HeadlineText,
  PrimaryButton,
  SecondaryButton,
} from "../../../styles/ui.styles"
import { Spacer } from "../../../components/Spacer.component"
import { ProgressBar } from "react-native-paper"
import { Text } from "react-native"
import { getFilesSize } from "../../../services/files/files.service"

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, token } = useContext(AuthContext)
  const { clearDirectories } = useContext(DirectoriesContext)
  const [driveData, setDriveData] = useState({ size: 0, storageLimit: 1 })
  useEffect(() => {
    ;(async () => {
      const data = await getFilesSize(token)
      setDriveData(data)
    })()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const data = await getFilesSize(token)
      setDriveData(data)
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  const trashPressHandler = () => {
    navigation.navigate("Trash")
  }

  const progress =
    Math.round((driveData.size / driveData.storageLimit) * 100) / 100

  const profilePressHandler = () => {
    navigation.navigate("Profile")
  }

  const logoutHandler = () => {
    onLogout()
    clearDirectories()
  }

  return (
    <>
      <SafeArea>
        <Spacer size="large">
          <HeadlineText>Settings & Account</HeadlineText>
        </Spacer>
        <DriveSpaceView>
          <Text>Drive space used</Text>
          <Text>{progress} GB of 1 GB</Text>
          <ProgressBar progress={progress} color="#5E72E4" />
        </DriveSpaceView>
        <SecondaryButton onPress={profilePressHandler} icon="account">
          Profile Settings
        </SecondaryButton>
        <Spacer size="medium">
          <SecondaryButton onPress={trashPressHandler} icon="trash-can-outline">
            Trash
          </SecondaryButton>
        </Spacer>
        <Spacer size="medium">
          <PrimaryButton onPress={logoutHandler}>Logout</PrimaryButton>
        </Spacer>
      </SafeArea>
    </>
  )
}
