import axios from "axios"
import { API_URL } from "../../../env"
import { DriveMode } from "../../utils/driveMode"

export const deleteContent = async (token, contents, mode) => {
  try {
    const queryParameters = `permanent=${
      mode === DriveMode.TRASH ? "true" : "false"
    }`
    console.log(queryParameters)
    const response = await axios.post(
      `${API_URL}/contents/delete?${queryParameters}`,
      { contents },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log("ERROR", error.response.data)
    return {
      error: true,
      ...error.response.data,
    }
  }
}

export const addRemoveFavorites = async (token, contents) => {
  try {
    const response = await axios.post(
      `${API_URL}/contents/favorite`,
      { contents },
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

export const moveContent = async (
  token,
  contentToMove,
  destinationDirectoryId
) => {
  try {
    const response = await axios.post(
      `${API_URL}/contents/move`,
      {
        contents: contentToMove,
        destinationDirectoryId,
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

export const shareContent = async (token, content, users) => {
  const userIds = users.map((user) => user.id)
  try {
    const response = await axios.post(
      `${API_URL}/contents/shared`,
      {
        content,
        userIds,
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

export const getSharedUsers = async (token, content) => {
  try {
    const response = await axios.get(
      `${API_URL}/contents/shared?contentId=${content.id}&contentType=${content.type}`,
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

export const restoreContents = async (token, contents) => {
  try {
    const response = await axios.post(
      `${API_URL}/contents/restore`,
      {
        contents,
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
