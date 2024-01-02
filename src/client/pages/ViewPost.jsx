import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import createComment from '@wasp/actions/createComment';

const ViewPostPage = () => {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { id: postId });
  const createCommentFn = useAction(createComment);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth(); // Assuming useAuth is a hook that provides user authentication status

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = async () => {
    setSubmitting(true);
    await createCommentFn({ postId, text: commentText });
    setCommentText('');
    setSubmitting(false);
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow'>
      <h1 className='text-2xl font-bold'>{post.title}</h1>
      <p className='text-gray-600'>By <Link to={`/user/${post.author.id}`} className='text-blue-600 hover:underline'>{post.author.username}</Link></p>
      <div className='my-4'>{post.content}</div>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>Comments</h2>
        {post.comments.map(comment => (
          <div key={comment.id} className='bg-gray-100 p-3 my-2 rounded-lg'>
            <p className='text-gray-800'>{comment.text}</p>
            <p className='text-gray-600 text-sm'>- {comment.author.username}</p>
          </div>
        ))}
      </div>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>Leave a comment</h2>
        {user && (
          <>
            <textarea
          className='w-full p-2 border rounded-lg my-2'
          rows='3'
          placeholder='Type your comment here...'
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
          onClick={handleCreateComment}
          disabled={submitting}
        >
          Post Comment
        </button>
          </>
        )}
        {!user && (
          <p>You must be logged in to post comments.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPostPage;
