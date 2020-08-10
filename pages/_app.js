import '../styles/index.css'
import { useApollo } from '../lib/apolloClient'
import { ApolloProvider } from '@apollo/client'

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  console.log("apollo client in _app.js")
  console.log(apolloClient.queryManager.link.request)
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
