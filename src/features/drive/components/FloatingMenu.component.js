import React from "react"
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import {
  AddItemButton,
  AddMenuView,
  FloatingMenuView,
  HorizontalLine,
} from "../../../styles/directories.styles"
import { useTheme } from "styled-components"
import { TouchableOpacity, Text } from "react-native"

export const FloatingMenu = ({
  opened,
  modalOpened,
  onNewDirClick,
  onToggle,
}) => {
  const theme = useTheme()

  const canBeRendered = !modalOpened && opened
  return (
    <FloatingMenuView>
      {canBeRendered && (
        <AddMenuView>
          <AddItemButton onPress={onNewDirClick}>
            <FontAwesome5
              name="folder-plus"
              size={35}
              color={theme.colors.darkGray}
            />
            <Text>New directory</Text>
          </AddItemButton>
          <HorizontalLine />
          <AddItemButton>
            <MaterialCommunityIcons
              name="file-plus"
              size={35}
              color={theme.colors.darkGray}
            />
            <Text>Upload file</Text>
          </AddItemButton>
        </AddMenuView>
      )}
      <TouchableOpacity onPress={onToggle}>
        {canBeRendered ? (
          <Ionicons
            name="close-circle"
            size={55}
            color={theme.colors.brand.primary}
          />
        ) : (
          <Ionicons
            name="add-circle"
            size={55}
            color={theme.colors.brand.primary}
          />
        )}
      </TouchableOpacity>
    </FloatingMenuView>
  )
}
