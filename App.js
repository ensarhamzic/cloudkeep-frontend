import styled from "styled-components"
import { Text, TextInput } from "react-native-paper"
import { Image, View } from "react-native"

const LoginView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const LogoImage = styled.Image`
  height: 130px;
  resize-mode: contain;
`

const SignText = styled.Text`
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;
`

const FormView = styled.View`
  margin-top: 10px;
  width: 80%;
`

const PasswordTextInput = styled(TextInput)`
  margin-top: 10px;
`

const FooterView = styled.View`
  margin-top: 10px;
`

export default function App() {
  return (
    <LoginView>
      <View>
        <LogoImage source={require("./assets/logo-full.png")} />
      </View>
      <View>
        <SignText>Sign in to your account</SignText>
      </View>
      <FormView>
        <TextInput label="Email" />
        <PasswordTextInput label="Password" />
      </FormView>
      <FooterView>
        <Text>Don't have an account? Sign Up</Text>
      </FooterView>
    </LoginView>
  )
}
