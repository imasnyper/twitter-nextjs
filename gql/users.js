import { gql } from '@apollo/client'

export const ALL_USERS = gql`
{
    userCollection {
        items {
            sys {
                id
                publishedAt
            }
            username
            fullName
            dateOfBirth
            followingCollection {
                items {
                    username
                }
            }
        }
    }
}
`

export const USER_BY_ID = gql`
query ($id: String!) {
	user(id: $id) {
    username
    fullName
    dateOfBirth
    followingCollection {
      items {
        username
      }
    }
  }
}
`

export const USER_BY_USERNAME = gql`
query ($username: String!) {
    userCollection(where: {username: $username}) {
        items {
            username
            fullName
            dateOfBirth
            followingCollection {
                items {
                    username
                }
            }
        }
    }
}  
`

export const USER_SUPERMAN = gql`
query ($username: String!) {
    userCollection(where: {username: "superman"}) {
        items {
            username
            fullName
            dateOfBirth
            followingCollection {
                items {
                    username
                }
            }
        }
    }
}  
`