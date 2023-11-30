import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import logo from "../../src/assets/logo.png"
import { useContext} from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
    const userx= useLoaderData();
    console.log("user",userx);
    const {user}= useContext(AuthContext);
    const filterEmail = user.email;
    
    const filteredMyUser = userx.filter((usery) => usery?.email === filterEmail);
    const isAdmin = filteredMyUser.length > 0 && filteredMyUser[0].isAdmin === 'true';

    // const isAdmin= "true" ;
    console.log("user",filteredMyUser);
    console.log(isAdmin);

    return (
        <div className="flex max-w-7xl mx-auto">
            <div className="w-72 min-h-screen bg-red-400">
            <Link to={"/"}><a className="normal-case text-xl "><img className="logo m-5" src={logo} alt="" /></a></Link>
                <h2 className="text-2xl text-white font-bold m-5">DashBoard</h2>
                <ul className="menu text-white font-bold">
                    {
                        isAdmin?
                        <div>
                            <li className="mb-2"><NavLink to='adminProfile'>Admin Profile</NavLink></li>
                            <li className="mb-2"><NavLink to='manageUsers'>Manage Users</NavLink></li>
                            <li className="mb-2"><NavLink to='makeAnnouncement'>Make Announcement</NavLink></li>
                            {/* <li className="mb-2"><NavLink to=''>Reported Comments/Activities</NavLink></li> */}
                            <div className="divider  divider-neutral"></div>
                        </div>
                        :
                        <div>
                        </div>
                    }
                    

                    

                    <li className="mb-2"><NavLink to='myprofile'>My Profile</NavLink></li>
                    <li className="mb-2"><NavLink to='addPost'>Add Post</NavLink></li>
                    <li className="mb-2"><NavLink to='myPost'>My Posts</NavLink></li>
                </ul>
            </div>
            <div className="flex-1 p-10"> 
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;