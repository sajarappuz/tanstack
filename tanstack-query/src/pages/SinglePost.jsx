import React from 'react';
import { fetchSinglePost } from '../routes/posts';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const SinglePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, isError, data: post, error } = useQuery(
    ['post', id], // Use a unique query key
    () => fetchSinglePost(id),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>No data found for this post.</div>;
  }

  return (
    <div className='flex flex-col items-center md:mx-20 mt-[150px]'>
      <button onClick={() => navigate('/')} className='w-[250px] h-[80px] bg-black text-white text-2xl px-3 rounded-lg '>Back to post page</button>
      <h1 className='mt-10 text-3xl font-bold uppercase'>{post.title}</h1>
      <p className='mt-10 text-2xl font-mono'>{post.body}</p>
    </div>
  );
};

export default SinglePost;
