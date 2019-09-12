import React, { Fragment, useState, useEffect } from 'react'
import queryString from 'query-string'
import { fetchItem, fetchComments } from '../utils/api'
import Loading from './Loading'
import PostMetaInfo from './PostMetaInfo'
import Title from './Title'
import Comment from './Comment'

const Post = (props) => {

    const [post, setPost] = useState(null);
    const [loadingPost, setLoadingPost] = useState(true);
    const [comments, setComments] = useState(null);
    const [loadingComments, setLoadingComments] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const { id } = queryString.parse(props.location.search);

        fetchItem(id)
            .then((post) => {
                setPost(post);
                setLoadingPost(false);

                return fetchComments(post.kids || [])
            })
            .then((comments) => {
                setComments(comments);
                setLoadingComments(false);
            })
            .catch(({ message }) => {
                setError(message);
                setLoadingPost(false);
                setLoadingComments(false);
            })

    })

    return error
        ? <p className='center-text error'>{error}</p>
        : (
            <Fragment>
                {loadingPost === true
                    ? <Loading text='Fetching post' />
                    : <Fragment>
                        <h1 className='header'>
                            <Title url={post.url} title={post.title} id={post.id} />
                        </h1>
                        <PostMetaInfo
                            by={post.by}
                            time={post.time}
                            id={post.id}
                            descendants={post.descendants}
                        />
                        <p>{post.text}</p>
                    </Fragment>}
                {loadingComments === true
                    ? loadingPost === false && <Loading text='Fetching comments' />
                    : <Fragment>
                        {comments.map((comment) =>
                            <Comment
                                key={comment.id}
                                comment={comment}
                            />
                        )}
                    </Fragment>}
            </Fragment>
        )
}


export default Post;