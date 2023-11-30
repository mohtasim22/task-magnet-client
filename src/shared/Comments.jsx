import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Comments = () => {
    const comments = useLoaderData();
    console.log(comments)
    const handleDeleteComment=(id)=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/comments/${id}`, {
            method: 'DELETE',
            headers:{
                'content-type':'application/json'
            },
            
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount >0){
                    toast("Comment Deleted");
                    // window.location.href = '/assignments';
                }
            })
    }
    return (
        <div>
            <div className="services-section max-w-6xl mx-auto py-16 font-rajdhani text-center">
                <div className="title text-center mb-10">
                    <h1 className="font-bold font-rajdhani text-5xl pb-5">Comments</h1>
                </div>
                <div className="overflow-x-auto">
                    <table className="table text-xl">
                        {/* head */}
                        <thead className="text-xl">
                        <tr>
                            <th>Name</th>
                            <th>Comment text</th>
                            <th>Feedback</th>
                            <th>Report</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {comments.map((comment)=>(
                            <tr key={comment._id}>
                                <td>{comment.name}</td>
                                <td>
                                    <div>
                                        {comment.comment.length <= 20 ? (
                                            <p>{comment.comment}</p>
                                        ) : (
                                            <div>
                                            <p>{comment.comment.slice(0, 20)}...</p>
                                            <button className="read-more" onClick={()=>document.getElementById('my_modal_1').showModal()}>Read More</button>
                                                <dialog id="my_modal_1" className="modal">
                                                <div className="modal-box">
                                                    <p className="py-4">{comment.comment}</p>
                                                    <div className="modal-action">
                                                    <form method="dialog">
                                                        <button className="btn">Close</button>
                                                    </form>
                                                    </div>
                                                </div>
                                                </dialog>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td><button className="btn">Feedback</button></td>
                                <td><button onClick={()=>handleDeleteComment(comment._id)} className="btn">Delete</button></td>
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

export default Comments;