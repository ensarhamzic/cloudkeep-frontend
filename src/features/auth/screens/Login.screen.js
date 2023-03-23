import React, { useMemo } from "react"
import {
  AuthHeadline,
  AuthView,
  LogoImage,
  FormView,
  LinkText,
} from "../components/auth.styles"
import { TextInput, Button } from "react-native-paper"
import { Spacer } from "../../../components/Spacer.component"
import { useTheme } from "styled-components"

export const LoginScreen = ({ navigation }) => {
  const theme = useTheme()
  const contentStyle = useMemo(
    () => ({
      flexDirection: "row-reverse",
      backgroundColor: theme.colors.logo.purple,
    }),
    [theme]
  )

  return (
    <AuthView>
      <LogoImage source={require("../../../../assets/logo-full.png")} />

      <Spacer position="top" size="large">
        <AuthHeadline>Sign in to your account</AuthHeadline>
      </Spacer>
      <Spacer size="large" />
      <FormView>
        <TextInput label="Email" />
        <Spacer position="top" size="medium">
          <TextInput label="Password" />
        </Spacer>
        <Spacer position="top" size="large">
          <Button
            icon="account-arrow-right"
            mode="contained"
            contentStyle={contentStyle}
          >
            Sign in
          </Button>
        </Spacer>
      </FormView>
      <Spacer position="top" size="large">
        <LinkText
          onPress={() => {
            navigation.navigate("Register")
          }}
        >
          Don't have an account? Sign Up
        </LinkText>
      </Spacer>
    </AuthView>
  )
}
