import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
// import Loading from './Loading'
import PostsList from './PostsList'

const Posts = ({ type }) => {

    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleFetch = async () => {
            setPosts(null);
            setError(null);
            setLoading(true);

            fetchMainPosts(type)
                .then((posts) => {
                    setPosts(posts);
                    setLoading(false);
                    setError(null);
                })
                .catch(({ message }) => {
                    setError(message);
                    setLoading(false);
                })
        }

            handleFetch();
    }, [type]);


    if (loading === true) {
        // return <Loading />
        return <h1>Loading</h1>
    }

    if (error) {
        return <p className='center-text error'>{error}</p>
    }

    return <PostsList posts={posts} />
}

Posts.propTypes = {
    type: PropTypes.oneOf(['top', 'new'])
}

export default Posts;