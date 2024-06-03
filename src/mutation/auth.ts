export const SIGNUP_MUTATION = `
  mutation Signup($username: String!, $displayName: String!, $password: String!) {
    signup(username: $username, displayName: $displayName, password: $password) {
        message
    }
  }
`;


export const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        token
    }
  }
`;