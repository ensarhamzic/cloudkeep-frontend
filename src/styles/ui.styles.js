import styled from "styled-components"
import { Button } from "react-native-paper"

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
  justify-content: space-between;
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
    backgroundColor: props.theme.colors.brand.secondary,
  },
}))``
