import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePosts = () => {
    const [posts,setposts] = useState([]);
    const [comments,setcomments] = useState([]);
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/posts`)
    //     .then(res =>res.json()
    //     )
    //     .then((data) =>{
    //         setposts(data);
    //     }
    //     )
        
    // },[])
    // console.log(posts)

    useEffect(()=>{
        fetch(`http://localhost:5000/comments`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setcomments(data);
        }
        )
        
    },[])

    const handlePopularitySort=()=>{
        
            fetch(`http://localhost:5000/postss?page=${currentPage}&size=${itemsPerPage}&sortbypop=yes`)
            .then(res =>res.json()
            )
            .then((data) =>{
                setposts(data);
            }
            )
            
        
    }
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
    const [count,setCount] = useState(0);
    // console.log(count);
    // eslint-disable-next-line no-unused-vars
    const [itemsPerPage,setItemsPerPage]= useState(5);
    const [currentPage,setCurrentPage]= useState(0);
    const numberOfPages= Math.ceil(count/itemsPerPage);
    // const handleItemsPerPage = e =>{
    //     const val= parseInt(e.target.value);
    //     setItemsPerPage(val);
    //     setCurrentPage(0);
    // }
    // const handleDifficulty = e =>{
    //     const val= e.target.value;
    //     setDifficulty(val);
    //     setCurrentPage(0);
    // }
    
    const pages =[...Array(numberOfPages).keys()];
    useEffect(()=>{
        fetch(`http://localhost:5000/postss?page=${currentPage}&size=${itemsPerPage}&sortbypop=no`)
        .then(res =>res.json()
        )
        .then((data) =>{
            const {count ,result}= data;
            setCount(count)
            setposts(result);
        }
        )
        
    },[currentPage,itemsPerPage])


    return (
        <div className="mb-10 pl-7 pr-7">
            <div className='title font-rajdhani text-4xl md:text-5xl font-extrabold text-center pt-10 pb-6'>
                <h1 className="mb-5">Posts</h1>
                <button onClick={() => handlePopularitySort()} className="btn btn-outline mt-5 mb-5">Sort By Popularity</button>
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
                                <h2 className="text-left font-bold text-xl md:text-2xl">{post.title}</h2>
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

                <div className="pagination mt-10 text-xl font-bold text-center">
                    {
                        pages.map(page =><button 
                            className={currentPage === page && 'selected'}
                            onClick={()=>setCurrentPage(page)}
                            key={page}>{page}</button>)
                    }
                    {/* <span className="ml-2 text-base">Items per page-</span>
                    <select 
                        value={itemsPerPage} 
                        onChange={handleItemsPerPage}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </select> */}
                </div>
        </div>
    );
};

export default HomePosts;