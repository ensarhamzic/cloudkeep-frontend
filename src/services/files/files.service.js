import axios from "axios"
import { API_URL } from "../../../env"

export const uploadFile = async (token, file, directoryId) => {
  try {
    const formData = new FormData()
    formData.append("file", {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    })
    if (directoryId) formData.append("directoryId", directoryId)
    const response = await axios.post(`${API_URL}/directory/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
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
