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
    console.log(error.response.data)
    return {
      error: true,
      ...error.response.data,
    }
  }
}

export const registerRequest = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, user)
    return response.data
  } catch (error) {
    return {
      error: true,
      ...error.response.data,
    }
  }
}

export const updateUserRequest = async (token, user) => {
  console.log(user)
  try {
    if (user.password === "") {
      user.password = null
      user.confirmPassword = null
    }
    const response = await axios.put(`${API_URL}/users`, user, {
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

export const verifyEmailRequest = async (email, code) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-email`, {
      email,
      code,
    })
    return response.data
  } catch (error) {
    return {
      error: true,
      ...error.response.data,
    }
  }
}

export const verifyTokenRequest = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/verify-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    return { error: true, ...error?.response?.data }
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, {
      email,
    })
    return response.data
  } catch (error) {
    return { error: true, ...error?.response?.data }
  }
}

export const resetPassword = async (email, code, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      email,
      code,
      password,
    })
    return response.data
  } catch (error) {
    return { error: true, ...error?.response?.data }
  }
}
