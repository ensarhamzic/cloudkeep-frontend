import * as FileSystem from "expo-file-system"
import * as IntentLauncher from "expo-intent-launcher"
import { shareAsync } from "expo-sharing"
import { Platform } from "react-native"
import { SortOrder } from "./sortOrder"
import { SortType } from "./sortType"

import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../../config"

export const downloadFile = async (fileUrl, destinationPath) => {
  try {
    // eslint-disable-next-line import/namespace
    let filePath = FileSystem.cacheDirectory + destinationPath
    // remove spaces from filePath
    filePath = filePath.replace(/\s/g, "")
    // eslint-disable-next-line import/namespace
    const result = await FileSystem.downloadAsync(fileUrl, filePath)

    // Linking.openURL(newUri)
    if (Platform.OS === "android") {
      try {
        // eslint-disable-next-line import/namespace
        const cUri = await FileSystem.getContentUriAsync(result.uri)
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
        })
      } catch {
        shareAsync(result.uri)
      }
    } else {
      shareAsync(result.uri)
    }
  } catch {}
}

export const sortData = (data, sortType, sortOrder) => {
  if (sortType === SortType.NAME)
    return sortOrder === SortOrder.ASCENDING
      ? data.sort((a, b) => a.name.localeCompare(b.name))
      : data.sort((a, b) => b.name.localeCompare(a.name))
  else if (sortType === SortType.CREATED_AT)
    return sortOrder === SortOrder.ASCENDING
      ? data.sort((a, b) => a.dateCreated - b.dateCreated)
      : data.sort((a, b) => b.dateCreated - a.dateCreated)
  else if (sortType === SortType.MODIFIED_AT)
    return sortOrder === SortOrder.ASCENDING
      ? data.sort((a, b) => a.dateModified - b.dateModified)
      : data.sort((a, b) => b.dateModified - a.dateModified)
  return data
}

export const getProfilePictureUrl = async (path) =>
  await getDownloadURL(ref(storage, path))
