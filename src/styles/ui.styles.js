import styled from "styled-components"
import { Button, ActivityIndicator } from "react-native-paper"

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
