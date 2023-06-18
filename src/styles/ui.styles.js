import styled from "styled-components"
import { Button, ActivityIndicator, TextInput } from "react-native-paper"

export const ModalView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 50px;
`

export const InnerModalView = styled.View`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
`

export const ModalActionsView = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-items: center;
  padding: 10px;
`

export const AcceptButton = styled(Button).attrs((props) => ({
  contentStyle: {
    backgroundColor: props.theme.colors.brand.primary,
  },
  labelStyle: {
    color: props.theme.colors.white,
  },
}))``

export const CancelButton = styled(Button).attrs((props) => ({
  contentStyle: {
    backgroundColor: props.theme.colors.error,
  },
  labelStyle: {
    color: props.theme.colors.white,
  },
}))``

export const CenteredActivityIndicator = styled(ActivityIndicator).attrs(
  () => ({
    size: 100,
  })
)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const BackButtonTouchableOpacity = styled.TouchableOpacity`
  margin-left: 10px;
  width: 60px;
`

export const PrimaryButton = styled(Button).attrs((props) => ({
  contentStyle: {
    backgroundColor: props.theme.colors.brand.primary,
  },
  mode: "contained",
}))`
  width: 50%;
  align-self: center;
`

export const SecondaryButton = styled(Button).attrs((props) => ({
  contentStyle: {
    flexDirection: "row-reverse",
    color: props.theme.colors.brand.primary,
  },
  mode: "outlined",
}))`
  width: 50%;
  align-self: center;
`

export const SelectedDirectoryView = styled.View`
  position: absolute;
  z-index: 10;
`
export const SelectedFileView = styled.View`
  position: absolute;
  top: 20px;
  z-index: 10;
`

export const FavoriteDirectoryView = styled.View`
  position: absolute;
  top: 55px;
  right: 50px;
  z-index: 10;
`

export const FavoriteFileView = styled.View`
  position: absolute;
  top: 5px;
  right: 60px;
  z-index: 10;
`

export const SharedDirectoryView = styled.View`
  position: absolute;
  top: 55px;
  left: 50px;
  z-index: 10;
`

export const SharedFileView = styled.View`
  position: absolute;
  top: 5px;
  left: 55px;
  z-index: 10;
`

export const HeaderRightOptionsView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-right: 10px;
`

export const UserListView = styled.ScrollView`
  padding: 10px;
`

export const UserCardTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  border-radius: 10px;
  margin-bottom: 10px;
`

export const ProfilePictureView = styled.View`
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

export const ProfilePictureImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`

export const HeadlineText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

export const SortBarView = styled.View`
  position: relative;
  z-index: 10;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  margin: 10px;
  margin-left: 30px;
`

export const SortMenuView = styled.View`
  position: absolute;
  top: 50px;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.white};
`

export const BasicFormInput = styled(TextInput).attrs((props) => ({
  contentStyle: {
    backgroundColor: props.theme.colors.white,
  },
}))``

export const DriveSpaceView = styled.View`
  padding: 10px 30px 10px 30px;
  margin: 10px;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  border-radius: 10px;
`

export const UpdateProfilePictureView = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
`

export const UpdateProfilePictureImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
`

export const NotConnectedView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 10px;
`

export const NotConnectedText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`
