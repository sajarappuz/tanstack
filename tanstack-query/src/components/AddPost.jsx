import React from 'react'
import PostForm from './PostForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../routes/posts'
import { v4 as uuidv4 } from 'uuid';

const AddPost = () => {

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ["posts"]});
      console.log("success");
    }
  });

  const handlePost = (post) =>{
      createPostMutation.mutate({
        id:uuidv4(),
        ...post
      })
  }

  return (
    <div className='mt-[40px]'>
        <h2 className='text-center text-3xl font-mono'>Add New Post</h2>
        <PostForm onSubmit={handlePost} initialValue={{}}/>
    </div>
  )
}

export default AddPost