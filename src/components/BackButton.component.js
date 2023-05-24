import React from "react"
import { Ionicons, AntDesign } from "@expo/vector-icons"
import { BackButtonTouchableOpacity } from "../styles/ui.styles"

export const BackButton = ({ onBackPress, cancel }) => {
  return (
    <BackButtonTouchableOpacity onPress={onBackPress}>
      {!cancel ? (
        <Ionicons name="chevron-back" size={40} color="black" />
      ) : (
        <AntDesign name="close" size={40} color="black" />
      )}
    </BackButtonTouchableOpacity>
  )
}
