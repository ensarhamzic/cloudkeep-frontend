import React from "react"
import {
  ProfilePictureView,
  UserCardTouchableOpacity,
} from "../styles/ui.styles"
import { Text } from "react-native"
import profilePicture from "../../assets/user-default-picture.png"
import { ProfilePictureImage } from "../styles/ui.styles"

export const UserCard = ({ user, onPress }) => {
  let ProfilePicture = <ProfilePictureImage source={profilePicture} />
  if (user.profilePicture) {
    ProfilePicture = (
      <ProfilePictureImage source={{ uri: user.profilePicture }} />
    )
  }

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
