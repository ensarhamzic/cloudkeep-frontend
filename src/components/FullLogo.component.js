import React from "react"
import { Image } from "react-native"
import styled from "styled-components"

const Logo = styled.Image`
  height: ${(props) => props.height}px;
  resize-mode: contain;
`

export const FullLogo = ({ height = 100, ...props }) => {
  return (
    <Logo
      source={require("../../assets/logo-full.png")}
      height={height}
      {...props}
    />
  )
}
