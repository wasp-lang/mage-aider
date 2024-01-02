import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPostForEdit from '@wasp/queries/getPostForEdit';
import editPost from '@wasp/actions/editPost';

const EditPostPage = () => {
  const { postId } = useParams();
  const history = useHistory();
  const { data: post, isLoading, error } = useQuery(getPostForEdit, { postId });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editPostFn = useAction(editPost);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editPostFn({ id: parseInt(postId), title, content });
    history.push('/');
  };

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <label className='block'>
          <span className='text-gray-700'>Title:</span>
          <input
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className='block'>
          <span className='text-gray-700'>Content:</span>
          <textarea
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type='submit' className='px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md'>Save Post</button>
        <Link to='/' className='text-indigo-600 hover:text-indigo-700'>Cancel</Link>
      </form>
    </div>
  );
}

export default EditPostPage;