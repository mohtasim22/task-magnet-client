
import { Link, useLoaderData } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";

const MyPosts = () => {
    const myPosts = useLoaderData();
    const {user}=useContext(AuthContext);
    const filterEmail = user.email;
    console.log(myPosts);
    const filteredMyPosts = myPosts.filter((myPost) => myPost.email === filterEmail);
    console.log(filteredMyPosts);

    const handleMyPosts = _id =>{
        const filterId = _id;
        const filteredSubAssn = subPosts.filter((subPost) => subPost._id === filterId);
        setSubAssn(filteredSubAssn);
        console.log(filteredSubAssn);
        console.log(subAssn);

    }
    const handleDeletePost=(id)=>{
        fetch(`http://localhost:5000/posts/${id}`, {
            method: 'DELETE',
            headers:{
                'content-type':'application/json'
            },
            
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount >0){
                    toast("Post Deleted");
                    // window.location.href = '/assignments';
                }
            })
    }

    return (
        <div>
            <div className="services-section max-w-6xl mx-auto py-16 font-rajdhani text-center">
                <div className="title text-center mb-10">
                    <h1 className="font-bold font-rajdhani text-5xl">My Posts</h1>
                    <h1 className="font-bold font-rajdhani text-2xl mt-5">Post Count: {filteredMyPosts?.length}</h1>
                </div>
                <div className="overflow-x-auto">
                    <table className="table text-xl">
                        {/* head */}
                        <thead className="text-xl">
                        <tr>
                            <th>Post title</th>
                            <th>Votes</th>
                            <th>Comment</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {filteredMyPosts.map((myPost)=>(
                            <tr key={myPost._id}>
                                <td>{myPost.title}</td>
                                <td>{myPost.upvote - myPost.downvote}</td>
                                <td><Link to={`/comments/${myPost.title}`} ><button className="btn">Comments</button></Link></td>
                                <td><button onClick={()=>handleDeletePost(myPost._id)} className="btn">Delete</button></td>
                            </tr>
                         ))}  
                        
                        </tbody>
                    </table>
                </div>
                 
            </div>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </div>
    );
};

export default MyPosts;