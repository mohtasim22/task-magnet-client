import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Posts = () => {
    const posts = useLoaderData();
    // const [posts,setposts] = useState([]);
    const [comments,setcomments] = useState([]);
    // useEffect(()=>{
    //     fetch(`https://assignment-12-server-murex-sigma.vercel.app/posts`)
    //     .then(res =>res.json()
    //     )
    //     .then((data) =>{
    //         setposts(data);
    //     }
    //     )
        
    // },[])
    console.log(posts)

    useEffect(()=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/comments`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setcomments(data);
        }
        )
        
    },[])

    function countComments(targetTitle) {
        const occurrences = comments.reduce((count, item) => {
          // Assuming the 'title' property represents the title in each object
          if (item.title === targetTitle) {
            return count + 1;
          }
          return count;
        }, 0);
      
        return occurrences;
    }

    return (
        <div className="mb-10 pl-7 pr-7 max-w-6xl mx-auto ">
            <div className='title font-rajdhani text-3xl md:text-5xl font-extrabold text-center pt-12 pb-6'>
                <h1>Posts</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post)=>(
                    
                    <Link key={post._id} to={`/postDetails/${post._id}`}>
                        <div  className="card card-compact ">
                        <div className="card-body flex-row">
                            <div className="post-author">
                                <img src={post.image} alt="" />
                            </div>
                            <div className="post-content">
                                <h2 className="text-left font-bold  text-2xl">{post.title}</h2>
                                <div className="tags">
                                    <span>{post.tag}</span>
                                </div>
                                
                                <p className="card-txt text-lg font-bold">Comments: {countComments(post.title)}</p>
                                <p className="card-txt text-lg font-bold">{post.time}</p>
                                <p className="card-txt text-lg font-bold">Votes: {post.upvote-post.downvote}</p>
                            </div>
                            

                            {/* <Link to={`/assignmentsDetails/${assignment._id}`} ><button className="btn">View Assignment</button></Link>
                            <Link to={`/updateAssignment/${assignment._id}`} ><button className="btn">Update Assignment</button></Link> */}

                            {/* <button  className="btn">View Assignment</button>
                            <button  className="btn">Update Assignment</button> */}
                            
                            
                        </div>
                    </div>
                    </Link>
                    
                    ))} 
                    
                
                </div>            
        </div>
    );
};

export default Posts;