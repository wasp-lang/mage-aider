import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createPost from '@wasp/actions/createPost';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createPostAction = useAction(createPost);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPostAction({ title, content });
      setTitle('');
      setContent('');
      history.push('/');
    } catch (error) {
      console.error('Failed to create the post:', error);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md'>
      <h2 className='text-xl font-semibold text-gray-700 text-center'>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className='mt-4'>
          <label className='block'>Title</label>
          <input
            type='text'
            className='mt-1 block w-full px-4 py-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Content</label>
          <textarea
            className='mt-1 block w-full px-4 py-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            rows='4'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className='flex justify-center mt-6'>
          <button
            type='submit'
            className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none'
          >
            Create Post
          </button>
        </div>
      </form>
      <div className='flex justify-center mt-4'>
        <Link to='/' className='text-blue-500 hover:underline'>Back to Home</Link>
      </div>
    </div>
  );
};

export default NewPostPage;