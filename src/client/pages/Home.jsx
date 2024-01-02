import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getPosts from '@wasp/queries/getPosts';
import useAuth from '@wasp/auth/useAuth';

const HomePage = () => {
  const { data: posts, isLoading, error } = useQuery(getPosts);
  const auth = useAuth();

  // Log the posts to the console for debugging
  React.useEffect(() => {
    console.log('Posts:', posts);
  }, [posts]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <div className='mb-4'>
        {auth.isAuthenticated && (
          <div className='mb-4'>
            <Link to="/new-post" className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
              New Post
            </Link>
          </div>
        )}
        {posts.map((post) => (
          <div key={post.id} className='flex justify-between items-center p-2 bg-gray-100 mb-2 rounded-lg'>
            <Link to={`/post/${post.id}`} className='font-semibold'>{post.title}</Link>
            <span className='text-sm text-gray-600'>{post.author.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
