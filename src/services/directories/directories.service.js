import axios from "axios"
import { API_URL } from "../../../env"
import { DriveMode } from "../../utils/driveMode"

export const getDirectories = async (token, directoryId, mode, payload) => {
  let queryParameters =
    `favorite=${mode === DriveMode.FAVORITES}&shared=${
      mode === DriveMode.SHARED
    }` + (directoryId !== null ? `&directoryId=${directoryId}` : "")
  let url = `${API_URL}/directories?${queryParameters}`

  if (mode === DriveMode.SEARCH && !directoryId) {
    if (!payload.query)
      return {
        directories: [],
        files: [],
        currentDirectory: null,
      }
    queryParameters = `query=${payload.query}`
    url = `${API_URL}/contents/search?${queryParameters}`
  }

  if (mode === DriveMode.TRASH) url = `${API_URL}/contents/trash`

  console.log(url)

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    return {
      error: true,
      ...error.response.data,
    }
  }
}

export const createDirectory = async (token, name, parentDirectoryId) => {
  try {
    const response = await axios.post(
      `${API_URL}/directories`,
      {
        name,
        parentDirectoryId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    return {
      error: true,
      ...error.response.data,
    }
  }
}

export const renameContent = async (
  token,
  content,
  name,
  parentDirectoryId
) => {
  try {
    const response = await axios.put(
      `${API_URL}/contents`,
      {
        id: content.id,
        type: content.type,
        name,
        parentDirectoryId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    return {
      error: true,
      ...error.response.data,
    }
  }
}
