import { gql } from '@apollo/client'

export const ALL_TWEETS = gql`
query AllTweets {
  tweetCollection {
    items {
      tweet
      user {
        username
        sys {
          id
          publishedAt
        }
      }
      sys {
        id
        publishedAt
      }
    }
  }
}
`