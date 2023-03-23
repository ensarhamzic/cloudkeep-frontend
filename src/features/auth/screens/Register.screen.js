import React, { useMemo } from "react"
import {
  AuthHeadline,
  AuthView,
  LogoImage,
  FormView,
  LinkText,
} from "../components/auth.styles"
import { TextInput } from "react-native-paper"
import { Spacer } from "../../../components/Spacer.component"
import { Button } from "react-native-paper"
import { useTheme } from "styled-components"

export const RegisterScreen = ({ navigation }) => {
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
        <AuthHeadline>Create an account</AuthHeadline>
      </Spacer>
      <Spacer size="large" />
      <FormView>
        <TextInput label="First Name" />
        <Spacer position="top" size="medium">
          <TextInput label="Last Name" />
        </Spacer>
        <Spacer position="top" size="medium">
          <TextInput label="Email" />
        </Spacer>
        <Spacer position="top" size="medium">
          <TextInput label="Username" />
        </Spacer>
        <Spacer position="top" size="medium">
          <TextInput label="Password" />
        </Spacer>
        <Spacer position="top" size="medium">
          <TextInput label="Confirm Password" />
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
            navigation.navigate("Login")
          }}
        >
          Already have an account? Sign in
        </LinkText>
      </Spacer>
      <Spacer size="xl" />
    </AuthView>
  )
}
