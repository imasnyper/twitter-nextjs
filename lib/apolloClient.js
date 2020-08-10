import { useMemo } from 'react'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'

let apolloClient

const apiLink = process.env.CONTENTFUL_GRAPHQL_API
const apiToken = process.env.CONTENTFUL_DEV_AUTH_TOKEN

const httpLink = createHttpLink({uri: apiLink});
const authLink = setContext((_, { headers }) => {
    const token = apiToken

    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        }
    }
})
const link = authLink.concat(httpLink)

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: link,
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  console.log("initializing apollo client for ssg and ssr")
  console.log(_apolloClient.queryManager.link.request)
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  console.log("initializing apollo client for client side requests")
  console.log(_apolloClient.queryManager.link.request)
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
