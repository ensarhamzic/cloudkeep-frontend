import styled from "styled-components"
import { Button, TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`

export const AuthScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})``

export const ErrorView = styled.View`
  color: ${({ theme }) => theme.colors.error};
  flex-direction: row;
  align-items: center;
`

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-style: italic;
`

export const AuthButton = styled(Button).attrs((props) => ({
  contentStyle: {
    flexDirection: "row-reverse",
    backgroundColor: props.theme.colors.brand.primary,
  },
}))``

export const AuthHeadline = styled.Text`
  font-size: 15px;
  font-weight: bold;
`

export const AuthSubHeadline = styled.Text`
  width: 80%;
  font-size: 15px;
`

export const FormView = styled.View`
  width: 80%;
`

export const LinkText = styled.Text`
  color: ${({ theme }) => theme.colors.link.primary};
  text-decoration: underline;
`

export const FormInput = styled(TextInput).attrs((props) => ({
  contentStyle: {
    backgroundColor: props.theme.colors.veryLightGray,
  },
}))``
