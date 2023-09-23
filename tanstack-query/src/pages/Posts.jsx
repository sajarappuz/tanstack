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
        <div className='flex flex-col items-center justify-center mt-[20px]'>
        {posts.map((post)=>(
          <div key={post.id} className='bg-slate-300 mb-4 w-[500px] h-[80px] flex items-center justify-between px-2 rounded-lg'>
            <h3 onClick={()=>navigate(`/post/${post.id}`)} className='font-bold text-3xl uppercase cursor-pointer'>{post.title}</h3>
            <div className=''>
            <button onClick={()=>navigate(`/post/${post.id}/edit`)} className='w-[80px] h-[40px]  bg-black text-white mr-3 rounded-md'>Edit</button>
            <button onClick={()=> handleDelete(post.id)} className='w-[80px] h-[40px] bg-red-400 text-black rounded-md'>Delete</button>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Posts