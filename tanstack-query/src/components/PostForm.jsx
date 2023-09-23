import { useState } from "react";

const PostForm = ({ onSubmit, initialValue }) => {
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
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-10">
      <div className="flex flex-col">
        <label className="font-bold uppercase">Title</label>
        <input
          onChange={handleChangeInput}
          type="text"
          name="title"
          
          value={post.title}
          className="bg-slate-200 h-[30px] w-[250px] rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold uppercase">Body</label>
        <input
          onChange={handleChangeInput}
          type="text"
          name="body"
          value={post.body}
          className="bg-slate-200 h-[60px] w-[250px] rounded-md"
        />
      </div>
      <button type="submit" className="bg-black text-white w-[200px] px-3 h-[40px] rounded-lg">Submit</button>
    </form>
  );
};

export default PostForm;
