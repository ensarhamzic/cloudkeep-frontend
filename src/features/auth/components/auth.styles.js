import styled from "styled-components"
import { Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`

export const AuthScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})``

export const AuthButton = styled(Button).attrs((props) => ({
  contentStyle: {
    flexDirection: "row-reverse",
    backgroundColor: props.theme.colors.logo.purple,
  },
}))``

export const AuthHeadline = styled.Text`
  font-size: 15px;
  font-weight: bold;
`

export const FormView = styled.View`
  width: 80%;
`

export const LinkText = styled.Text`
  color: ${({ theme }) => theme.colors.link.primary};
  text-decoration: underline;
`
