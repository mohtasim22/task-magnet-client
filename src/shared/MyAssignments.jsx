import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";


const MyAssignments = () => {

    const myAssignments = useLoaderData();
    const {user}=useContext(AuthContext);
    const filterEmail = user.email;
    const filteredMyAssignments = myAssignments.filter((myAssignment) => myAssignment.email === filterEmail);
    console.log(filteredMyAssignments);
    return (
        <div>
            <div className="services-section max-w-6xl mx-auto py-16 font-rajdhani text-center">
                <div className="title text-center mb-10">
                    <h1 className="font-bold font-rajdhani text-5xl">My Assignments</h1>
                </div>
                <div className="overflow-x-auto">
                    <table className="table text-xl">
                        {/* head */}
                        <thead className="text-xl">
                        <tr>
                            <th>Assignment title</th>
                            <th>Status</th>
                            <th>Marks</th>
                            <th>Obtained Marks</th>
                            <th>Feedback</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {filteredMyAssignments.map((myAssignment)=>(
                            <tr key={myAssignment._id}>
                                <td>{myAssignment.title}</td>
                                <td>{myAssignment.status}</td>
                                <td>{myAssignment.marks}</td>
                                <td>{myAssignment.obtainedMarks}</td>
                                <td>{myAssignment.feedback}</td>
                            </tr>
                        ))}
                        
                        </tbody>
                    </table>
                </div>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg text-black mb-5">Assignment Submission Form</h3>
                        <form action="" className="text-left">
                            <div className="mb-5">
                                <label
                                    htmlFor="brand"
                                    className="block text-md font-semibold text-gray-800 undefined"
                                >
                                    Pdf Link
                                </label>
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        name="image"
                                        className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="description"
                                    className="block text-md font-semibold text-gray-800 undefined"
                                >
                                    Description
                                </label>
                                <div className="flex flex-col items-start">
                                    
                                    <textarea
                                        type="text"
                                        name="description"
                                        className="textarea textarea-bordered block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40">
                                    </textarea>
                                </div>
                                
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="marks"
                                    className="block text-md font-semibold text-gray-800 undefined"
                                >
                                    Marks
                                </label>
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        name="image"
                                        className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="description"
                                    className="block text-md font-semibold text-gray-800 undefined"
                                >
                                    Feedback
                                </label>
                                <div className="flex flex-col items-start">
                                    
                                    <textarea
                                        type="text"
                                        name="description"
                                        className="textarea textarea-bordered block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40">
                                    </textarea>
                                </div>
                                
                            </div>

                            <div className="col-span-2 items-center modal-action">
                                <button className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500 text-2xl font-bold">
                                    Submit Marks
                                </button>
                            </div>

                        </form>
                        
                    </div>
                </dialog> 
            </div>
        </div>
    );
};

export default MyAssignments;