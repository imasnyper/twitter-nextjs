import { useQuery } from '@apollo/client'
import { USER_BY_USERNAME, ALL_USERS, USER_SUPERMAN } from '../../gql/users'
import { useRouter } from 'next/router'

function User(props) {
    const router = useRouter()
    const { username } = router.query
    const userQueryVars = {
        username: `${username}`
    }
    const {loading, error, fetchMore, data} = useQuery(USER_SUPERMAN, {
        variables: userQueryVars,
        notifyOnNetworkStatusChange: true,
    })
    
    if(loading) return <p>Loading... ⌛</p>
    if(error) {
        console.log(error)
        return `${error}`
    }

    return <p>user</p>
}

// export async function getStaticPaths() {
//     return {paths: [], fallback: true}
// }

// export async function getStaticProps() {
//     const apolloClient = initializeApollo()

//     await apolloClient.query({
//         query: USER_BY_USERNAME,
//         variables: {username: 'superman'}
//     })

//     return {
//         props: {
//             initialApolloState: apolloClient.cache.extract(),
//         },
//         revalidate: 1,
//     }
// }

export default User