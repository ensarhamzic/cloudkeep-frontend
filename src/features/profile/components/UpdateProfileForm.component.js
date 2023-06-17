import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../../services/auth/authContext"
import { FormInput, FormView, AuthButton } from "../../../styles/auth.styles"
import { Spacer } from "../../../components/Spacer.component"
import { InputError } from "../../../components/InputError.component"
import { updateUserRequest } from "../../../services/auth/auth.service"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-root-toast"
import profilePicture from "../../../../assets/user-default-picture.png"
import {
  UpdateProfilePictureImage,
  UpdateProfilePictureView,
} from "../../../styles/ui.styles"
import { Text, TouchableOpacity } from "react-native"
import { getProfilePictureUrl } from "../../../utils/functions"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import { uploadProfilePicture } from "../../../services/files/files.service"

export const UpdateProfileForm = () => {
  const { user, onAuth, onLogout, token } = useContext(AuthContext)
  const navigation = useNavigation()

  const [firstName, setFirstName] = useState("")
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastName, setLastName] = useState("")
  const [lastNameError, setLastNameError] = useState(null)
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState(null)

  const [profilePictureUrl, setProfilePictureUrl] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (user.profilePicture) {
        let url = user.profilePicture
        if (!url.startsWith("https://"))
          url = await getProfilePictureUrl(user.profilePicture)
        setProfilePictureUrl(url)
      }
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setUsername(user.username)
    })()
  }, [])

  const source = profilePictureUrl ? { uri: profilePictureUrl } : profilePicture

  const registerHandler = () => {
    setFormSubmitted(true)

    if (!firstName) setFirstNameError("First Name is required")
    else if (firstName.length < 2)
      setFirstNameError("Must be at least 2 characters long")
    else setFirstNameError(null)

    if (!lastName) setLastNameError("Last Name is required")
    else if (lastName.length < 2)
      setLastNameError("Must be at least 2 characters long")
    else setLastNameError(null)

    if (!username) setUsernameError("Username is required")
    else if (username.length < 5)
      setUsernameError("Must be at least 5 characters long")
    else setUsernameError(null)

    if (password && password.length < 8)
      setPasswordError("Password must be at least 8 characters")
    else setPasswordError(null)
    if (password && confirmPassword !== password)
      setConfirmPasswordError("Passwords must match")
    else setConfirmPasswordError(null)
  }

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      setFormSubmitted(false)
      const canSendRequest =
        formSubmitted &&
        !firstNameError &&
        !lastNameError &&
        !usernameError &&
        !passwordError &&
        !confirmPasswordError
      if (canSendRequest) {
        setIsLoading(true)
        setRegisterError(null)
        const user = {
          firstName,
          lastName,
          username,
          profilePicture,
          password,
          confirmPassword,
        }
        const response = await updateUserRequest(token, user)
        if (response.error) {
          setRegisterError(response.message)
          setIsLoading(false)
          return
        }
        Toast.show("Profile updated successfully", {
          duration: Toast.durations.LONG,
        })

        if (response.shouldLogout) {
          await onLogout()
          return
        }

        onAuth(response)
        navigation.navigate("Main")
      }
    })()
  }, [formSubmitted, usernameError, passwordError])

  const notVerified = user?.verified === false
  useEffect(() => {
    if (notVerified) navigation.replace("VerifyAccount")
  }, [notVerified])

  const changeProfilePictureHandler = async () => {
    const { status: permissionStatus } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    )
    if (permissionStatus !== "granted") {
      // alert("Sorry, we need camera roll permissions to make this work!")
      // return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })

    if (!result.canceled) {
      const imagePath = await uploadProfilePicture(result.assets[0].uri)
      setProfilePicture(imagePath)
      setProfilePictureUrl(result.assets[0].uri)
    }
  }

  return (
    <>
      <Spacer position="bottom" size="large">
        <TouchableOpacity onPress={changeProfilePictureHandler}>
          <UpdateProfilePictureView>
            <UpdateProfilePictureImage source={source} />
            <Text>Tap to change</Text>
          </UpdateProfilePictureView>
        </TouchableOpacity>
      </Spacer>
      <FormView>
        <FormInput
          label="First Name"
          onChangeText={setFirstName}
          value={firstName}
          error={firstNameError}
          disabled={isLoading}
        />
        <InputError error={firstNameError} />
        <Spacer position="top" size="medium">
          <FormInput
            label="Last Name"
            onChangeText={setLastName}
            value={lastName}
            error={lastNameError}
            disabled={isLoading}
          />
          <InputError error={lastNameError} />
        </Spacer>

        <Spacer position="top" size="medium">
          <FormInput
            label="Username"
            onChangeText={setUsername}
            value={username}
            error={usernameError}
            disabled={isLoading}
          />
          <InputError error={usernameError} />
        </Spacer>
        <Spacer position="top" size="medium">
          <FormInput
            secureTextEntry
            label="New Password (optional)"
            onChangeText={setPassword}
            value={password}
            error={passwordError}
            disabled={isLoading}
          />
          <InputError error={passwordError} />
        </Spacer>
        {password.length > 0 && (
          <Spacer position="top" size="medium">
            <FormInput
              secureTextEntry
              label="Confirm Password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              error={confirmPasswordError}
              disabled={isLoading}
            />
            <InputError error={confirmPasswordError} />
          </Spacer>
        )}
        <Spacer position="top" size="large">
          <AuthButton
            icon={!isLoading && "account-arrow-right"}
            mode="contained"
            onPress={registerHandler}
          >
            {isLoading ? "Updating..." : "Update"}
          </AuthButton>
        </Spacer>
        <InputError error={registerError} />
      </FormView>
    </>
  )
}
