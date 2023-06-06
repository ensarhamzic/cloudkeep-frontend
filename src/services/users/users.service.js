import axios from "axios"
import { API_URL } from "../../../env"

export const searchUsers = async (token, query) => {
  try {
    const response = await axios.get(`${API_URL}/users/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        query,
      },
    })
    return response.data
  } catch (error) {
    return { error: true, ...error.response.data }
  }
}
