import styled from "styled-components"

export const AuthView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const LogoImage = styled.Image`
  height: 130px;
  resize-mode: contain;
`

export const AuthHeadline = styled.Text`
  font-size: 15px;
  font-weight: bold;
`

export const FormView = styled.View`
  width: 80%;
`

export const LinkText = styled.Text`
  color: ${(props) => props.theme.colors.link.primary};
  text-decoration: underline;
`
