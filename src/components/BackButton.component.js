import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { BackButtonTouchableOpacity } from "../styles/ui.styles"

export const BackButton = ({ onBackPress }) => {
  return (
    <BackButtonTouchableOpacity onPress={onBackPress}>
      <Ionicons name="chevron-back" size={40} color="black" />
    </BackButtonTouchableOpacity>
  )
}
