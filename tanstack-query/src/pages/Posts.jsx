import React from 'react'
import AddPost from '../components/AddPost'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../routes/posts'
import { useNavigate } from 'react-router-dom'

const Posts = () => {

  const navigate = useNavigate();

    const { isLoading, isError, data: posts, error} = useQuery({
      queryKey: ["posts",],
      queryFn : fetchPosts
    });

    if (isLoading) return 'Loading....'
    if (isError) return `Error:${error.message}`

    console.log(posts);

  return (
    <div>
        <AddPost/>
        {posts.map((post)=>(
          <div key={post.id}>
            <h3 onClick={()=>navigate(`/post/${post.id}`)}>{post.title}</h3>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
    </div>
  )
}

export default Posts