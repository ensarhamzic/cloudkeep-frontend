import React from "react"
import { Spacer } from "./Spacer.component"
import { ErrorView, ErrorText } from "../styles/auth.styles"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useTheme } from "styled-components"

export const InputError = ({ error }) => {
  const theme = useTheme()
  if (!error) return null

  return (
    <Spacer position="top" size="medium">
      <ErrorView>
        <Icon name="error" size={25} color={theme.colors.error} />
        <Spacer position="left" size="small">
          <ErrorText>{error}</ErrorText>
        </Spacer>
      </ErrorView>
    </Spacer>
  )
}
