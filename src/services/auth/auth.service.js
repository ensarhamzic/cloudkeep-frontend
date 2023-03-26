import axios from "axios"
import { API_URL } from "../../../env"

export const loginRequest = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    })
    return response.data
  } catch (error) {
    return {
      error: true,
      ...error.response.data,
    }
  }
}

export const registerRequest = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, user)
    console.log("RESPONSE", response.data)
    return response.data
  } catch (error) {
    console.log("ERR", error.response.data)
    return {
      error: true,
      ...error.response.data,
    }
  }
}
