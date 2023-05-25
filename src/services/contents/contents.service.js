import axios from "axios"
import { API_URL } from "../../../env"

export const deleteContent = async (token, contents) => {
  try {
    const response = await axios.post(
      `${API_URL}/contents`,
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
