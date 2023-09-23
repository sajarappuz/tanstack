import React from 'react'
import AddPost from '../components/AddPost'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deletePost, fetchPosts } from '../routes/posts'
import { useNavigate } from 'react-router-dom'

const Posts = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

    const { isLoading, isError, data: posts, error} = useQuery({
      queryKey: ["posts",],
      queryFn : fetchPosts
    });

    const deletePostMutation = useMutation({
      mutationFn: deletePost,
      onSuccess: () =>{
         queryClient.invalidateQueries({ queryKey:["posts"]});
      }
    })

    const handleDelete = (id) =>{
      deletePostMutation.mutate(id)
    }

    if (isLoading) return 'Loading....'
    if (isError) return `Error:${error.message}`

    console.log(posts);

  return (
    <div>
        <AddPost/>
        {posts.map((post)=>(
          <div key={post.id}>
            <h3 onClick={()=>navigate(`/post/${post.id}`)}>{post.title}</h3>
            <button onClick={()=>navigate(`/post/${post.id}/edit`)}>Edit</button>
            <button onClick={()=> handleDelete(post.id)}>Delete</button>
          </div>
        ))}
    </div>
  )
}

export default Posts