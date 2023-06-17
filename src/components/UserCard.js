import React, { useEffect, useState } from "react"
import {
  ProfilePictureView,
  UserCardTouchableOpacity,
  ProfilePictureImage,
} from "../styles/ui.styles"
import { Text } from "react-native"
import profilePicture from "../../assets/user-default-picture.png"
import { getProfilePictureUrl } from "../utils/functions"

export const UserCard = ({ user, onPress }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (user.profilePicture) {
        let url = user.profilePicture
        if (!url.startsWith("https://"))
          url = await getProfilePictureUrl(user.profilePicture)
        setProfilePictureUrl(url)
      }
    })()
  }, [user])

  const source = profilePictureUrl ? { uri: profilePictureUrl } : profilePicture
  const ProfilePicture = <ProfilePictureImage source={source} />

  const userPressHandler = () => {
    onPress(user)
  }

  return (
    <>
      <UserCardTouchableOpacity key={user.id} onPress={userPressHandler}>
        <ProfilePictureView>
          {ProfilePicture}
          <Text style={{ fontWeight: "bold" }}>
            {user.firstName} {user.lastName}
          </Text>
          <Text>|</Text>
          <Text>{user.username}</Text>
        </ProfilePictureView>
      </UserCardTouchableOpacity>
    </>
  )
}
