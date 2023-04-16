import React, { useState } from "react"
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

export const FloatingMenu = () => {
  const [isOpened, setIsOpened] = useState(false)
  const theme = useTheme()
  return (
    <FloatingMenuView>
      {isOpened && (
        <AddMenuView>
          <AddItemButton>
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
      <TouchableOpacity onPress={() => setIsOpened((prev) => !prev)}>
        {isOpened ? (
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
