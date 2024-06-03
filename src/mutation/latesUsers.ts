export const GET_LATEST_USERS_MUTATION = `
query GetLatesUsers {
    users: getLatestUsers {
        displayName,
        username,
        id,
        avatar
      }
  }`