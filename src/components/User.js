import React, { Fragment, useState, useEffect } from 'react'
import queryString from 'query-string'
import { fetchUser, fetchPosts } from '../utils/api'
import Loading from './Loading'
import { formatDate } from '../utils/helpers'
import PostsList from './PostsList'

const User = (props) => {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [posts, setPosts] = useState(null);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const { id } = queryString.parse(props.location.search);

        fetchUser(id)
            .then((user) => {
                setUser(user);
                setLoadingUser(false);

                return fetchPosts(user.submitted.slice(0, 30));
            })
            .then((posts) => {
                setPosts(posts);
                setLoadingPosts(false);
                setError(null);
            })
            .catch(({ message }) => {
                setError(message);
                setLoadingUser(false);
                setLoadingPosts(false);
            })
    })

    return error
        ? <p className='center-text error'>{error}</p>
        : (
            <Fragment>
                {loadingUser === true
                    ? <Loading text='Fetching User' />
                    : <Fragment>
                        <h1 className='header'>{user.id}</h1>
                        <div className='meta-info-light'>
                            <span>joined <b>{formatDate(user.created)}</b></span>
                            <span>has <b>{user.karma.toLocaleString()}</b> karma</span>
                        </div>
                        <p>{user.about}</p>
                    </Fragment>}
                {loadingPosts === true
                    ? loadingUser === false && <Loading text='Fetching posts' />
                    : <Fragment>
                        <h2>Posts</h2>
                        <PostsList posts={posts} />
                    </Fragment>}
            </Fragment>
        )
}


export default User