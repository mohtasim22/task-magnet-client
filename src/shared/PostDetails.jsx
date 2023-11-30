
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TwitterShareButton,
    XIcon,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";

const PostDetails = () => {
    const post = useLoaderData();
    const [comments,setcomments] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [countUp, setCountUp] = useState(parseInt(post.upvote));
    const [countDown, setCountDown] = useState(parseInt(post.downvote));

    const handleUpClick = () => {
        if (!clicked) {
        // If the button hasn't been clicked yet, update the state
        setClicked(true);
        setCountUp( countUp +1);
        console.log(countUp);

        const upvote=countUp+1;
        const downvote=countDown;

        const newPost={upvote,downvote}
        fetch(`http://localhost:5000/posts/${post._id}`, {
            method: 'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount>0){
                    toast("Post Upvoted");
                    // window.location.href = '/assignments';
                }
        })
        }
        // You can add an else block if you want to handle subsequent clicks differently
    };
    const shareUrl = `https://study-point-auth-1dfbf.web.app/posts/${post._id}`;
    console.log(countUp);
    const handleDownClick = () => {
        if (!clicked) {
        // If the button hasn't been clicked yet, update the state
        setClicked(true);
        setCountDown(countDown + 1);
        const upvote=countUp;
        const downvote=countDown+1;

        const newPost={upvote,downvote}
        fetch(`http://localhost:5000/posts/${post._id}`, {
            method: 'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount>0){
                    toast("Post Upvoted");
                    // window.location.href = '/assignments';
                }
        })
        }
        // You can add an else block if you want to handle subsequent clicks differently
    };
    useEffect(()=>{
        fetch(`http://localhost:5000/comments`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setcomments(data);
        }
        )
        
    },[])
    const filterTitle = post.title;
    const filteredComments = comments.filter((comment) => comment.title === filterTitle);
    console.log(post);

    const handleSubAssignments = e =>{
        e.preventDefault();
        const form= new FormData(e.currentTarget);

        const pdfLink=form.get('pdfLink');
        const description=form.get('description');
        const title=assignment.title;
        const email=user.email;    
        const status='pending';    
        const marks=assignment.marks;    
        const obtainedMarks='Unchecked';    
        const feedback='Unchecked';    
        const examinee=user.displayName;    
        const newSubAssignment={title,examinee,pdfLink,email,description,status,marks,obtainedMarks,feedback};   
        console.log(newSubAssignment);

        //send data to the server 
        fetch('https://brand-shop-server-brown-pi.vercel.app/submittedAssignments', {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            credentials:'include',
            withCredentials: true,
            body: JSON.stringify(newSubAssignment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    toast("Assignment Submitted");
                }
        })

    }

    // console.log(assignment);

    return (
        <div>
            <div className="services-section max-w-6xl mx-auto py-16 font-rajdhani text-center">
            <div className='title font-rajdhani text-5xl font-extrabold text-center pt-12 pb-6'>
                <h1>Posts Details</h1>
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
                                <p className="card-txt text-md font-bold">{post.date}</p>
                                <p className="card-txt text-lg mt-2">{post.description}</p>
                                <div className="post-buttons text-left">
                                    <button onClick={handleUpClick} disabled={clicked} className="btn btn-outline mr-2">UpVote: {countUp} </button>
                                    <button onClick={handleDownClick} disabled={clicked} className="btn btn-outline mr-2">DownVote: {countDown}</button>
                                    <Link to={`/postComments/${post._id}`}><button className="btn btn-outline mr-2">Commment</button></Link>
                                    
                                    <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Share</button>
                                    <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box text-black">
                                        <div className="flex">
                                            <div className="mr-5">
                                                <FacebookShareButton
                                                    url={shareUrl}
                                                    >
                                                    <FacebookIcon size={64} round />
                                                </FacebookShareButton>
                                            </div>
                                            <div className="mr-5">
                                                <FacebookMessengerShareButton
                                                    url={shareUrl}
                                                    appId="521270401588372"
                                                    >
                                                    <FacebookMessengerIcon size={64} round />
                                                </FacebookMessengerShareButton>
                                            </div>
                                            <div className="mr-5">
                                                <TwitterShareButton
                                                    url={shareUrl}
                                                    >
                                                    <XIcon size={64} round />
                                                </TwitterShareButton>
                                            </div>
                                            <div className="mr-5">
                                                <TelegramShareButton
                                                    url={shareUrl}
                                                    >
                                                    <TelegramIcon size={64} round />
                                                </TelegramShareButton>
                                            </div>
                                            <div className="mr-5">
                                            <WhatsappShareButton
                                                url={shareUrl}
                                                separator=":: "
                                                >
                                                <WhatsappIcon size={64} round />
                                            </WhatsappShareButton>
                                            </div>
                                        </div>
                                        
                                    
                                    
                                        <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>
                                        </div>
                                    </div>
                                    </dialog>
                                </div>
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

export default PostDetails;