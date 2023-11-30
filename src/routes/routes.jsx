import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/root";
import Home from "../pages/Home";
import LogIn from "../shared/LogIn";
import Register from "../shared/Register";
import NotFoundPage from "../shared/NotFoundPage";
import PrivateRoutes from "./PrivateRoutes";
import Assignments from "../shared/Assignments";
import SubmittedAssignmnets from "../shared/MyPosts";
import UpdateAssignment from "../shared/UpdateAssignment";
import AddPost from "../shared/AddPost";
import PostDetails from "../shared/PostDetails";
import MyPosts from "../shared/MyPosts";
import Comments from "../shared/Comments";
import PostComments from "../shared/PostComments";
import Posts from "../shared/Posts";
import Dashboard from "../layouts/Dashboard";
import MyProfile from "../shared/MyProfile";
import Membership from "../shared/Membership";
import ManageUsers from "../shared/ManageUsers";
import MakeAnnouncement from "../shared/MakeAnnouncement";
import Announcements from "../shared/Announcements";
import AdminProfile from "../shared/AdminProfile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <NotFoundPage></NotFoundPage>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/addPost",
            element: <AddPost></AddPost>
        },
        {
            path: "/postDetails/:id",
            element: <PostDetails></PostDetails>,
            loader: ({params}) => fetch(`http://localhost:5000/posts/${params.id}`)
        },
        {
            path: "/posts/:tag",
            element: <Posts></Posts>,
            loader: ({params}) => fetch(`http://localhost:5000/postss/${params.tag}`)
        },
        {
            path: "/myPosts",
            element: <MyPosts></MyPosts>,
            loader: () => fetch('http://localhost:5000/posts'),
        },
        {
            path: "/comments/:title",
            element:<Comments></Comments>,
            loader: ({params}) => fetch(`http://localhost:5000/comments/${params.title}`)
        },
        {
            path: "/announcements",
            element: <Announcements></Announcements>,
        },
        {
            path: "/postComments/:id",
            element: <PrivateRoutes><PostComments></PostComments></PrivateRoutes> ,
            loader: ({params}) => fetch(`http://localhost:5000/posts/${params.id}`)
        },
        {
            path: "/login",
            element: <LogIn></LogIn>
            
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
            path: "/membership",
            element: <PrivateRoutes><Membership></Membership></PrivateRoutes>,
        },
      ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        loader: () => fetch('http://localhost:5000/users'),
        children: [
            {
                path:'myprofile',
                element:<PrivateRoutes><MyProfile></MyProfile></PrivateRoutes> ,
                loader: () => fetch('http://localhost:5000/users'),
            },
            {
                path:'addPost',
                element: <PrivateRoutes><AddPost></AddPost></PrivateRoutes>,
                loader: () => fetch('http://localhost:5000/posts'),
            },
            {
                path:'myPost',
                element: <PrivateRoutes><MyPosts></MyPosts></PrivateRoutes>,
                loader: () => fetch('http://localhost:5000/posts'),
            },
            {
                path:'manageUsers',
                element: <PrivateRoutes><ManageUsers></ManageUsers></PrivateRoutes>,
                loader: () => fetch('http://localhost:5000/users'),
            },
            {
                path:'adminProfile',
                element: <PrivateRoutes><AdminProfile></AdminProfile></PrivateRoutes>,
                loader: () => fetch('http://localhost:5000/users'),
            },
            {
                path:'makeAnnouncement',
                element: <PrivateRoutes><MakeAnnouncement></MakeAnnouncement></PrivateRoutes>,
            },
        ]
    }
  ]);

  export default router;