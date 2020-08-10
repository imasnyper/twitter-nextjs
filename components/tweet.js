import moment from 'moment'
import Link from 'next/link'

export default function Tweet({tweet}) {
    return (
        <>
        <Link href={`/users/${tweet.user.username}`}><a><h2>{tweet.user.username}</h2></a></Link>
        <p>{tweet.tweet}</p>
        <p>Created At: <span>{moment(tweet.sys.publishedAt).calendar()}</span></p>
        </>
    )
}