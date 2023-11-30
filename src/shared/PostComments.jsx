import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Providers/AuthProvider";

const PostComments = () => {
    const post = useLoaderData();
    const [comments,setcomments] = useState([]);
    useEffect(()=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/comments`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setcomments(data);
        }
        )
        
    },[])

    const {user}=useContext(AuthContext);

    const filterTitle = post.title;
    const filteredComments = comments.filter((comment) => comment.title === filterTitle);
    console.log(post);

    const filterEmail = user?.email;
    const [users,setusers] = useState([]);
    useEffect(()=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/users`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setusers(data);
        }
        )
        
    },[])
    const filteredUser = users.filter((myPost) => myPost?.email === filterEmail);


    console.log(filteredUser);
    const handleAddComment = e =>{
        e.preventDefault();
        const form= new FormData(e.currentTarget);

        const title=post.title;
        const image=filteredUser[0]?.image;
        const name=filteredUser[0]?.name;

        const comment=form.get('comment'); 
        const newPost={title,comment,image,name}   
        console.log(newPost);

        //send data to the server 
        fetch('https://assignment-12-server-murex-sigma.vercel.app/comments', {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    toast("Posted");
                }
        })

    }
    return (
        <div>
            <div className="services-section max-w-6xl mx-auto py-16 font-rajdhani text-center">
            <div className='title font-rajdhani text-5xl font-extrabold text-center pt-12 pb-6'>
                <h1>Post Comments</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div  className="card card-compact ">
                        <div className="card-body flex-row">
                            <div className="post-author">
                                <img src={post.image} alt="" />
                            </div>
                            <div className="post-content">
                                <p className="card-txt text-lg font-bold">{post.name}</p>
                                <h2 className="text-left font-bold  text-2xl">{post.title}</h2>
                                <div className="tags">
                                    <span>{post.tag}</span>
                                </div>
                                <p className="card-txt text-lg font-bold">{post.time}</p>
                                <p className="card-txt text-lg font-bold">{post.description}</p>

                                <div className="post-comments flex-row ">
                                {filteredComments.map((comment)=>(
                                    <div key={comment._id} className="comments card-body flex-row">
                                        <div className="post-author">
                                            <img src={comment.image} alt="" />
                                        </div>
                                        <div className="post-content">
                                            <p className="card-txt text-lg font-bold">{comment.name}</p>
                                            <h2 className="text-left font-bold  text-2xl">{comment.comment}</h2>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                
                                <div className="post-comments">
                                    <form action="" onSubmit={handleAddComment} >
                                        <div>
                                            <label
                                                htmlFor="description"
                                                className="block mt-3 text-white text-left text-md font-semibold undefined"
                                            >
                                                Post a Comment
                                            </label>
                                            <div className="flex flex-col items-start">
                                                <textarea
                                                    type="text"
                                                    name="comment"
                                                    className="textarea textarea-bordered block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40">
                                                </textarea>
                                            </div>
                                
                                        </div>
                                        <div className="col-span-2 items-center mt-4 ">
                                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500 text-2xl font-bold">
                                                Post
                                            </button>
                                        </div>
                                    </form>
                                    

                                </div>
                                
                            </div>
                            

                            {/* <Link to={`/assignmentsDetails/${assignment._id}`} ><button className="btn">View Assignment</button></Link>
                            <Link to={`/updateAssignment/${assignment._id}`} ><button className="btn">Update Assignment</button></Link> */}

                            {/* <button  className="btn">View Assignment</button>
                            <button  className="btn">Update Assignment</button> */}
                            
                            
                        </div>
                    </div>
                    
                    
                
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

export default PostComments;