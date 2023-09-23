import React from 'react'
import Posts from './pages/Posts'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SinglePost from './pages/SinglePost';
import EditPost from './pages/EditPost';

const App = () => {
   
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div><Posts/>  </div>,
    },
    {
      path: "/post/:id",
      element: <div><SinglePost/>  </div>,
    },
    {
      path: "/post/:id/edit",
      element: <div><EditPost/>  </div>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App