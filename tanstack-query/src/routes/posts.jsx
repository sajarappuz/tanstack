export const fetchPosts = async () =>{
     const response = await fetch('http://localhost:3000/posts');
     return response.json()
}
export const fetchSinglePost = async (id) =>{
     const response = await fetch(`http://localhost:3000/posts/${id}`);
     return response.json()
}