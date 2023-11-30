import { useLoaderData } from "react-router-dom";

const Comments = () => {
    const comments = useLoaderData();
    console.log(comments)

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
                                <td><button className="btn">Delete</button></td>
                            </tr>
                        ))}
                            
                        
                        </tbody>
                    </table>
                </div>
                 
            </div>
        </div>
    );
};

export default Comments;