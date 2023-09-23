import { useState } from "react";

const PostForm = ({ onSubmit, initialValue = {} }) => {
  const [post, setPost] = useState({
    title: initialValue.title || "",
    body: initialValue.body || ""
  });

  console.log(post);

  const handleChangeInput = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post);
    setPost({
      title: "",
      body: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          onChange={handleChangeInput}
          type="text"
          name="title"
          value={post.title}
        />
      </div>
      <div>
        <label>Body</label>
        <input
          onChange={handleChangeInput}
          type="text"
          name="body"
          value={post.body}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
