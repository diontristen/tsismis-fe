export const BASE_USER_DATA_RETURN = `
  id,
  username,
  displayName,
  description,
  createdAt,
  avatar,
  tsismisCount,
  likesCount,
  favoritesCount
`

export const GET_USER_DATA_MUTATION = `
query Me {
  user: me {
    ${BASE_USER_DATA_RETURN}
  }
}`


export const GET_USER_BY_USERNAME_MUTATION = `
query GetUserByUsername($username: String!) {
  user: getUserByUsername(username: $username) {
    ${BASE_USER_DATA_RETURN}
  }
}`

export const GET_USER_BY_USERNAME_SEARCH_MUTATION = `
query SearchUsers($username: String!, $cursor: String!, $limit: Int!) {
  users: searchUsers(username: $username, cursor: $cursor, limit: $limit) {
    users {
      id,
      username,
      displayName,
      description,
      createdAt,
      avatar,
    },
    endCursor,
    hasNextPage
  }
}`



export const UPDATE_USER_PASSWORD_MUTATION = `
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    user: updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      success
    }
  }
`

export const UPDATE_USER_PROFILE_MUTATION = `
  mutation UpdateUser($displayName: String!, $description: String) {
    user: updateUser(displayName: $displayName, description: $description) {
      ${BASE_USER_DATA_RETURN}
    }
  }
`