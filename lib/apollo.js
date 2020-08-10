import withApollo from 'next-with-apollo'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// const apiLink = process.env.GRAPHCMS_PROJECT_API
// const apiToken = process.env.GRAPHCMS_DEV_AUTH_TOKEN
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

export default withApollo(({initialState}) => {
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    });
},
{
    render: ({Page, props}) => {
        return (
            <ApolloProvider client={props.apollo}>
                <Page {...props} />
            </ApolloProvider>
        );
    }
});