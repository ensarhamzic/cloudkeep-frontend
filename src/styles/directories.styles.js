import styled from "styled-components"
import { Button } from "react-native-paper"

export const DirectoryTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 180px;
`

export const FileTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 150px;
`

export const DirectoryName = styled.Text`
  flex: 1;
  flex-wrap: wrap;
  text-align: center;
`

export const FloatingMenuView = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 25px;
  justify-content: center;
  align-items: flex-end;
`

export const AddMenuView = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.white};
`

export const AddItemButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  gap: 10px;
`

export const HorizontalLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.darkGray};
  align-self: stretch;
  margin: 10px 0;
`

export const MoveButton = styled(Button).attrs((props) => ({
  contentStyle: {
    backgroundColor: props.theme.colors.brand.primary,
  },
}))`
  position: absolute;
  bottom: 20px;
  right: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const EmptyContentText = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`
