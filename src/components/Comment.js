import React from 'react'
import PostMetaInfo from './PostMetaInfo'

const Comment = ({ comment }) => {
    return (
        <div className='comment'>
            <PostMetaInfo
                comment={true}
                by={comment.by}
                time={comment.time}
                id={comment.id}
            />
            <p>{comment.text}</p>
        </div>
    )
}

export default Comment;