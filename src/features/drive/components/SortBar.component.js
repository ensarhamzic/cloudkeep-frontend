import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { SortOrder } from "../../../utils/sortOrder"
import {
  HeadlineText,
  SortBarView,
  SortMenuView,
} from "../../../styles/ui.styles"
import { SortType } from "../../../utils/sortType"

export const SortBar = ({
  sortType,
  sortOrder,
  onSortTypeChange,
  onSortOrderChange,
  sortMenuOpened,
  onSortTypePress,
}) => {
  let sortTypeText = ""
  switch (sortType) {
    case SortType.NAME:
      sortTypeText = "Name"
      break
    case SortType.CREATED_AT:
      sortTypeText = "Created Date"
      break
    case SortType.MODIFIED_AT:
      sortTypeText = "Modified Date"
      break
  }

  const sortTypePressHandler = (order) => {
    onSortTypeChange(order)
  }

  return (
    <SortBarView>
      <TouchableOpacity onPress={onSortTypePress}>
        <Text>{sortTypeText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          onSortOrderChange(
            sortOrder === SortOrder.ASCENDING
              ? SortOrder.DESCENDING
              : SortOrder.ASCENDING
          )
        }
      >
        {sortOrder === SortOrder.ASCENDING ? (
          <AntDesign name="arrowup" size={25} color="black" />
        ) : (
          <AntDesign name="arrowdown" size={25} color="black" />
        )}
      </TouchableOpacity>
      {sortMenuOpened && (
        <SortMenuView>
          <HeadlineText>Sort by</HeadlineText>
          <TouchableOpacity onPress={() => sortTypePressHandler(SortType.NAME)}>
            <Text>Name</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sortTypePressHandler(SortType.CREATED_AT)}
          >
            <Text>Created Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sortTypePressHandler(SortType.MODIFIED_AT)}
          >
            <Text>Modified Date</Text>
          </TouchableOpacity>
        </SortMenuView>
      )}
    </SortBarView>
  )
}
