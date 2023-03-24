import axios from "axios"
import { API_URL } from "../../../env"

export const loginRequest = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error.response.data)
  }
}
