import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import logo from "../../src/assets/logo.png"
import { useContext} from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
    // const userx= useLoaderData();
    // console.log("user",userx);
    const {user}= useContext(AuthContext);
    console.log(user)
    
    // const filteredMyUser = userx.filter((usery) => usery?.email === filterEmail);
    // const isAdmin = filteredMyUser.length > 0 && filteredMyUser[0].isAdmin === 'true';

    // // const isAdmin= "true" ;
    // console.log("user",filteredMyUser);
    // console.log(isAdmin);

    
    return (
        <div className="flex max-w-7xl mx-auto">
            <div className="w-72 min-h-screen bg-red-400">
            <Link to={"/"}><a className="normal-case text-xl "><img className="logo m-5" src="https://i.ibb.co/XXHrmhr/Screenshot-2023-12-20-213108.png" alt="" /></a></Link>

                <div>
                    <h1 className="text-2xl text-white font-bold m-5">Welcome!</h1>
                    <img className="text-2xl text-white font-bold m-5" src={user?.photoURL} alt="" />
                    <h1 className="text-xl text-white font-bold m-5">{user?.displayName}</h1>
                </div>
                <h2 className="text-2xl text-white font-bold m-5">DashBoard</h2>
                <ul className="menu text-white font-bold">
                    <li className="mb-2"><NavLink to='myprofile'>Task Management</NavLink></li>
                </ul>
            </div>
            <div className="flex-1 p-10"> 
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;