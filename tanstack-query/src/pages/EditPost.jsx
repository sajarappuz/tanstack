import React from 'react'
import PostForm from '../components/PostForm'
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSinglePost, updatePost } from '../routes/posts';

const EditPost = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, isError, data: post, error } = useQuery(
    ['post', id], // Use a unique query key
    () => fetchSinglePost(id),
  );

  
  const editPostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ["posts"]});
      navigate("/")
      console.log("success");}
  })

  const handleEdit =(editedPost) =>{
      editPostMutation.mutate({
        id,
        ...editedPost
      })
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className='mt-[200px]'>
        <PostForm initialValue={post} onSubmit={handleEdit}/>
    </div>
  )
}

export default EditPost