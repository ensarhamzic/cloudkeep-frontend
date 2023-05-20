import axios from "axios"
import { API_URL } from "../../../env"
import { ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../../config"
import uuid from "react-native-uuid"

export const uploadFiles = async (token, files, directoryId) => {
  try {
    const uploadedFiles = []

    for (const file of files) {
      const filePath = uuid.v4()
      const storageRef = ref(storage, filePath)
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
          resolve(xhr.response)
        }

        xhr.onerror = function (e) {
          console.log(e)
          reject(new TypeError("Network request failed"))
        }

        xhr.responseType = "blob"
        xhr.open("GET", file.uri, true)
        xhr.send()
      })

      const uploadTask = uploadBytesResumable(storageRef, blob)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + Math.round(progress) + "% done")
        },
        (error) => {
          console.log("ERROR", error)
        },
        async () => {
          uploadedFiles.push({
            name: file.name || filePath,
            path: filePath,
          })

          if (uploadedFiles.length === files.length) {
            const data = {
              files: uploadedFiles,
              directoryId,
            }
            const response = await axios.post(
              `${API_URL}/directory/upload`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            return response.data
          }
        }
      )
    }
  } catch (error) {
    return {
      error: true,
      ...error.response.data,
    }
  }
}
