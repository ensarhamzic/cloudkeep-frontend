import axios from "axios"
import { API_URL } from "../../../env"

export const getDirectories = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/directories`, {
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
