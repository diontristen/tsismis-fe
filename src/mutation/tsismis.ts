export const BASE_TSISMIS_RETURN = `
id,
message,
tags,
createdAt,
likes,
hasLiked,
favorites,
hasFavorited,
user {
  displayName,
  username,
  id,
  avatar
}
`

export const POST_TSISMIS_MUTATION = `
mutation CreateTsismis($message: String!, $tags: [String!]!) {
    tsismis: createTsismis(message: $message, tags: $tags) {
      ${BASE_TSISMIS_RETURN}
    }
  }`

export const DELETE_TSISMIS_MUTATION = `
  mutation DeleteTsismis($id: String!) {
      tsismis: deleteTsismis(id: $id) {
       success
      }
    }`

export const UPDATE_TSISMIS_MUTATION = `
    mutation UpdateTsismis($id: String!, $message: String!, $tags: [String!]!) {
        tsismis: updateTsismis(id: $id, message: $message, tags: $tags) {
          ${BASE_TSISMIS_RETURN}
        }
      }`

export const GET_TSISMIS_MUTATION = `
  query GetTsismis($cursor: String!, $limit: Int!) {
    tsismis: getTsismis(cursor: $cursor, limit: $limit) {
        tsismis {
          ${BASE_TSISMIS_RETURN}
        },
        endCursor,
        hasNextPage
      }
  }`

export const GET_OWN_TSISMIS_MUTATION = `
  query GetTsismisByOwnUser($cursor: String!, $limit: Int!) {
      tsismis: getTsismisByOwnUser(cursor: $cursor, limit: $limit) {
        tsismis {
          ${BASE_TSISMIS_RETURN}
        },
        endCursor,
        hasNextPage
        }
    }`

export const GET_TSISMIS_BY_USERNAME_MUTATION = `
  query GetTsismisByUsername($username: String!, $cursor: String!, $limit: Int!) {
      tsismis: getTsismisByUsername(username: $username, cursor: $cursor, limit: $limit) {
        tsismis {
          ${BASE_TSISMIS_RETURN}
        },
        endCursor,
        hasNextPage
        }
    }`

export const GET_TSISMIS_BY_SEARCH_MUTATION = `
    query SearchTsismisMessages($query: String!, $cursor: String!, $limit: Int!) {
        tsismis: searchTsismisMessages(query: $query, cursor: $cursor, limit: $limit) {
          tsismis {
            ${BASE_TSISMIS_RETURN}
          },
          endCursor,
          hasNextPage
          }
      }`


export const GET_OWN_FAVORITE_TSISMIS_MUTATION = `
    query GetFavoriteTsismisByOwnUser($cursor: String!, $limit: Int!) {
        tsismis: getFavoriteTsismisByOwnUser(cursor: $cursor, limit: $limit) {
          tsismis {
            ${BASE_TSISMIS_RETURN}
          },
          endCursor,
          hasNextPage
          }
      }`

export const LIKE_TSISMIS_MUTATION = `
    mutation LikeTsismis($id: String!) {
      tsismis: likeTsismis(tsismisId: $id) {
        success
      }
    }
`

export const UNLIKE_TSISMIS_MUTATION = `
    mutation UnlikeTsismis($id: String!) {
      tsismis: unlikeTsismis(tsismisId: $id) {
        success
      }
    }
`

export const FAVORITE_TSISMIS_MUTATION = `
    mutation FavoriteTsismis($id: String!) {
      tsismis: favoriteTsismis(tsismisId: $id) {
        success
      }
    }
`

export const UNFAVORITE_TSISMIS_MUTATION = `
    mutation UnfavoriteTsismis($id: String!) {
      tsismis: unfavoriteTsismis(tsismisId: $id) {
        success
      }
    }
`