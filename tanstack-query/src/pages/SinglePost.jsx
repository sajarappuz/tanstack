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
    <div>
      <button onClick={() => navigate('/')}>Back to post page</button>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default SinglePost;
