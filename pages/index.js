import Container from '../components/container'
import Tweet from '../components/tweet'
import Layout from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { ALL_TWEETS } from '../gql/tweets'
import { ALL_USERS } from '../gql/users'
import { initializeApollo } from '../lib/apolloClient'


function Index() {
  const { loading, error, data, fetchMore } = useQuery(ALL_TWEETS, {notifyOnNetworkStatusChange: true})

  if(loading) return <p>Loading... ⌛</p>
  if(error) {
    return <p>Error 😭</p>
  }
  if(data && data.tweetCollection) {
    return (
      <>
        <Layout>
          <Head>
            <title>Twitter</title>
          </Head>
          <Container>
            <ul>
              {data.tweetCollection.items.map(tweet => (
                <li key={tweet.sys.id}><Tweet tweet={tweet}></Tweet></li>
              ))}
            </ul>
          </Container>
        </Layout>
      </>
    )
  }
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_USERS
  })
    .then(console.log())

  const paths = []
  return {paths: paths, fallback: false}
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_TWEETS,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default Index