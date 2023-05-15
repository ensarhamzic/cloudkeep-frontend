import axios from "axios"
import { API_URL } from "../../../env"

export const uploadFile = async (token, file, directoryId) => {
  try {
    const formData = new FormData()
    console.log(file)
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

export const uploadMedia = async (token, assets, directoryId) => {
  try {
    const formData = new FormData()

    for (const asset of assets) {
      const localUri = asset.uri
      const filename = localUri.split("/").pop()

      console.log(asset)
      // Infer the type of the image
      const assetType = /\.(\w+)$/.exec(filename)[1]
      const type =
        asset.type === "image" ? `image/${assetType}` : `video/${assetType}`

      console.log("TYPE", type)

      formData.append("files", {
        uri: localUri,
        type,
        name: filename,
      })
    }

    if (directoryId) formData.append("directoryId", directoryId)
    const response = await axios.post(
      `${API_URL}/directory/upload/media`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
