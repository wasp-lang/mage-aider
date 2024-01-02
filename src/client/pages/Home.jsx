import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getPosts from '@wasp/queries/getPosts';

const HomePage = () => {
  const { data: posts, isLoading, error } = useQuery(getPosts);

  // Log the posts to the console for debugging
  React.useEffect(() => {
    console.log('Posts:', posts);
  }, [posts]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <div className='mb-4'>
        {posts.map((post) => (
          <div key={post.id} className='flex justify-between items-center p-2 bg-gray-100 mb-2 rounded-lg'>
            <Link to={`/post/${post.id}`} className='font-semibold'>{post.title}</Link>
            <span className='text-sm text-gray-600'>{post.author.username}</span>
          </div>
        ))}
      </div>
      { /* Only show the New Post button if the user is logged in */ }
      { /* TODO: Check if user is logged in and render button if true */ }
    </div>
  );
};

export default HomePage;
