import axios from "axios"
import { API_URL } from "../../../env"

export const getDirectories = async (token, directoryId, mode) => {
  const queryParameters =
    `favorite=${mode}&` +
    (directoryId !== null ? `directoryId=${directoryId}` : "")

  console.log("QUERY PARAMS", queryParameters)

  try {
    const response = await axios.get(
      `${API_URL}/directories?${queryParameters}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response.data)
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
  console.log(name)
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
