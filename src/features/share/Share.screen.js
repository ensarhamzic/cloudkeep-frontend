import React, { useState, useEffect, useContext } from "react"
import { Text, BackHandler } from "react-native"
import { Spacer } from "../../components/Spacer.component"
import { AcceptButton, HeadlineText } from "../../styles/ui.styles"
import { ErrorText, FormInput } from "../../styles/auth.styles"
import { ActivityIndicator } from "react-native-paper"
import { UserList } from "../../components/UserList.component"
import { searchUsers } from "../../services/users/users.service"
import { AuthContext } from "../../services/auth/authContext"
import { HorizontalLine } from "../../styles/directories.styles"
import {
  shareContent,
  getSharedUsers,
} from "../../services/contents/contents.service"

export const ShareScreen = ({ route, navigation }) => {
  const { token } = useContext(AuthContext)
  const [userQuery, setUserQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [foundUsers, setFoundUsers] = useState([])
  const [sharedUsers, setSharedUsers] = useState([])
  const content = route?.params?.content
  const contentId = content?.id

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Share with users",
    })
  }, [navigation])

  useEffect(() => {
    ;(async () => {
      if (contentId) {
        const data = await getSharedUsers(token, content)
        if (data.error) {
          setError(data.message)
          return
        }
        setSharedUsers(data.users)
      }
    })()
  }, [contentId])

  const shareContentHandler = async () => {
    setIsLoading(true)
    setError(null)
    const data = await shareContent(token, content, sharedUsers)
    console.log(data)
    setIsLoading(false)
    if (data.error) {
      setError(data.message)
      return
    }
    navigation.goBack()
  }

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
      {sharedUsers.length > 0 && <HeadlineText>Shared with:</HeadlineText>}
      <UserList users={sharedUsers} onUserPress={userPressHandler} />
      <Spacer size="large">
        <AcceptButton onPress={shareContentHandler} disabled={isLoading}>
          <Text>
            {sharedUsers.length === 0 ? "Don't share with anyone" : "Share"}
          </Text>
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
