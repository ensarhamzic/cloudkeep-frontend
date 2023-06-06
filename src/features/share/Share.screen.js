import React, { useState, useEffect, useContext } from "react"
import { Text, BackHandler } from "react-native"
import { Spacer } from "../../components/Spacer.component"
import { AcceptButton, ModalActionsView } from "../../styles/ui.styles"
import { ErrorText, FormInput } from "../../styles/auth.styles"
import { ActivityIndicator } from "react-native-paper"
import { UserList } from "../../components/UserList.component"
import { searchUsers } from "../../services/users/users.service"
import { AuthContext } from "../../services/auth/authContext"
import { DirectoriesContext } from "../../services/directories/directoriesContext"
import { HorizontalLine } from "../../styles/directories.styles"

export const ShareScreen = ({ route, navigation }) => {
  const { token } = useContext(AuthContext)
  const { onContentShare } = useContext(DirectoriesContext)
  const [userQuery, setUserQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [foundUsers, setFoundUsers] = useState([])
  const [sharedUsers, setSharedUsers] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false)

  console.log(route?.params)

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Share with users",
    })
  }, [navigation])

  const shareContentHandler = async () => {}

  const onCancel = () => {
    setUserQuery("")
    setFoundUsers([])
    setSharedUsers([])
    setError(null)
  }

  useEffect(() => {
    ;(async () => {
      if (userQuery.length < 3) {
        setFoundUsers([])
        return
      }
      setError(null)
      const data = await searchUsers(token, userQuery)
      if (data.error) {
        setError(data.message)
        return
      }
      console.log(data)
      setFoundUsers(data.users)
    })()
  }, [userQuery])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onCancel()
        return false
      }
    )

    // Remove back button listener on unmount
    return () => backHandler.remove()
  }, [onCancel])

  const userPressHandler = (user) => {
    const userIndex = sharedUsers.findIndex((u) => u.id === user.id)
    if (userIndex === -1) setSharedUsers((prev) => [...prev, user])
    else setSharedUsers((prev) => prev.filter((u) => u.id !== user.id))
  }

  return (
    <Spacer size="large">
      <FormInput
        placeholder="Search users"
        onChangeText={setUserQuery}
        value={userQuery}
        label="username"
      />
      {error && (
        <Spacer size="medium">
          <ErrorText>{error}</ErrorText>
        </Spacer>
      )}
      <UserList users={foundUsers} onUserPress={userPressHandler} />
      <HorizontalLine />
      <UserList users={sharedUsers} onUserPress={userPressHandler} />
      <Spacer size="large">
        <AcceptButton onPress={shareContentHandler} disabled={isLoading}>
          <Text>Share</Text>
        </AcceptButton>
      </Spacer>
      {isLoading && (
        <Spacer size="medium">
          <ActivityIndicator />
        </Spacer>
      )}
    </Spacer>
  )
}
