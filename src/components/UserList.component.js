import React from "react"
import { Spacer } from "./Spacer.component"
import { UserListView } from "../styles/ui.styles"
import { UserCard } from "./UserCard"

export const UserList = ({ users, onUserPress }) => {
  return (
    <>
      {users.length > 0 && (
        <Spacer size="medium">
          <UserListView>
            {users.map((user) => (
              <UserCard key={user.id} user={user} onPress={onUserPress} />
            ))}
          </UserListView>
        </Spacer>
      )}
    </>
  )
}
