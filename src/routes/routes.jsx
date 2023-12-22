import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/root";
import Home from "../pages/Home";
import LogIn from "../shared/LogIn";
import Register from "../shared/Register";
import NotFoundPage from "../shared/NotFoundPage";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layouts/Dashboard";
import MyProfile from "../shared/MyProfile";
import AboutUs from "../shared/AboutUs";
import Contact from "../shared/Contact";

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
            path: "/login",
            element: <LogIn></LogIn>
            
        },
        {
            path: "/aboutus",
            element: <AboutUs></AboutUs>
            
        },
        {
            path: "/contact",
            element: <Contact></Contact>
            
        },
        {
            path: "/register",
            element: <Register></Register>
        },
      ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        // loader: () => fetch('https://assignment-12-server-murex-sigma.vercel.app/users'),
        children: [
            {
                path:'myprofile',
                element:<PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>,
                // loader: () => fetch('https://assignment-12-server-murex-sigma.vercel.app/users'),
            },
            {
                path:'todo',
                element:<MyProfile></MyProfile>,
                // loader: () => fetch('https://assignment-12-server-murex-sigma.vercel.app/users'),
            },
            {
                path:'ongoing',
                element:<MyProfile></MyProfile>,
                // loader: () => fetch('https://assignment-12-server-murex-sigma.vercel.app/users'),
            },
            {
                path:'completed',
                element:<MyProfile></MyProfile>,
                // loader: () => fetch('https://assignment-12-server-murex-sigma.vercel.app/users'),
            },
        ]
    }
  ]);

  export default router;