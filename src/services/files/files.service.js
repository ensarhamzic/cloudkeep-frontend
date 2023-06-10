import axios from "axios"
import { API_URL } from "../../../env"
import { ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../../config"
import uuid from "react-native-uuid"
import { FileType } from "../../utils/fileType"

const getFileType = ({ uri }) => {
  const uriParts = uri.split(".")
  const type = uriParts[uriParts.length - 1].toLowerCase()
  switch (type) {
    case "jpg":
    case "jpeg":
    case "png":
    case "svg":
    case "webp":
      return FileType.IMAGE

    case "avi":
    case "mov":
    case "mp4":
    case "wmv":
    case "webm":
      return FileType.VIDEO

    case "aac":
    case "mp3":
    case "wav":
    case "ogg":
    case "m4a":
      return FileType.AUDIO

    case "doc":
    case "docx":
    case "odt":
    case "rtf":
    case "txt":
      return FileType.DOCUMENT

    case "pdf":
      return FileType.PDF

    case "ppt":
    case "pptx":
    case "odp":
      return FileType.PRESENTATION

    case "xls":
    case "xlsx":
    case "ods":
      return FileType.SPREADSHEET

    case "zip":
    case "rar":
    case "7z":
      return FileType.ARCHIVE

    default:
      return FileType.OTHER
  }
}

export const uploadFiles = async (token, files, directoryId, handler) => {
  return new Promise(async (resolve, reject) => {
    const uploadedFiles = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const uriParts = file.uri.split(".")
      const extension = uriParts[uriParts.length - 1].toLowerCase()
      const filePath = uuid.v4() + "." + extension
      const storageRef = ref(storage, filePath)
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
          resolve(xhr.response)
        }

        xhr.onerror = function () {
          reject(new TypeError("Network request failed"))
        }

        xhr.responseType = "blob"
        xhr.open("GET", file.uri, true)
        xhr.send()
      })

      await new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, blob)
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )

            handler(progress)
          },
          (error) => {
            reject(error)
          },
          () => {
            uploadedFiles.push({
              name: file.name || filePath,
              path: filePath,
              type: getFileType(file),
              size: blob.size,
            })
            resolve()
          }
        )
      })
    }

    const data = {
      files: uploadedFiles,
      directoryId,
    }

    try {
      const response = await axios.post(`${API_URL}/directory/upload`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      resolve(response.data)
    } catch (error) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        error: true,
        ...error.response.data,
      })
    }
  })
}

export const getFilesSize = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/files/size`, {
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
