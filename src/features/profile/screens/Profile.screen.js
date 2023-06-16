import React from "react"
import { AuthScrollView, SafeArea } from "../../../styles/auth.styles"
import { UpdateProfileForm } from "../components/UpdateProfileForm.component"
import { HeadlineText } from "../../../styles/ui.styles"
import { Spacer } from "../../../components/Spacer.component"

export const ProfileScreen = ({ route, navigation }) => {
  return (
    <SafeArea>
      <AuthScrollView>
        <Spacer position="bottom" size="xl">
          <HeadlineText>Update Your Profile Information</HeadlineText>
        </Spacer>
        <UpdateProfileForm />
      </AuthScrollView>
    </SafeArea>
  )
}
