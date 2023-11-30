import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext, useEffect, useState } from "react";

const MyProfile = () => {
    const [posts,setposts] = useState([]);
    const userx = useLoaderData();
    const {user}= useContext(AuthContext);
    const filterEmail = user.email;
    
    useEffect(()=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/posts`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setposts(data);
        }
        )
        
    },[])

    const filteredMyPosts = posts.filter((myPost) => myPost.email === filterEmail);
    console.log(filteredMyPosts);

    
    const filteredMyUser = userx.filter((user) => user.email === filterEmail);
    console.log(filteredMyUser);
    return (
        <div className="max-w-6xl mx-auto text-white">
            <h2 className="text-6xl font-bold">My Profile</h2>
            <img className="mt-6 w-40" src={filteredMyUser[0].image} alt="" />
            <h2 className="text-5xl mt-4">Name: {filteredMyUser[0].name}</h2>
            <h2 className="text-5xl mt-4">Email: {filteredMyUser[0].email}</h2>
            <h2 className="text-5xl mt-4">Badge: {filteredMyUser[0].badge}</h2>
            <div className="recent-posts mt-10">
            <h2 className="text-3xl font-bold">Recent Posts</h2>
                <table className="table text-xl mt-5">
                            {/* head */}
                            <thead className="text-xl">
                            <tr>
                                <th>Post title</th>
                                <th>tag</th>
                                <th>Votes</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                            {filteredMyPosts.slice(0, 3).map((myPost)=>(
                                <tr key={myPost._id}>
                                    <td>{myPost.title}</td>
                                    <td>{myPost.tag}</td>
                                    <td>{myPost.upvote - myPost.downvote}</td>
                                </tr>
                            ))}  
                            
                            </tbody>
                        </table>
                </div>
        </div>
    );
};

export default MyProfile;