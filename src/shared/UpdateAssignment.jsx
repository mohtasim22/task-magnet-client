import { useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Providers/AuthProvider';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { useLoaderData } from 'react-router-dom';

const UpdateAssignment = () => {
    const assignment = useLoaderData();
    console.log(assignment)
    const [startDate, setStartDate] = useState(new Date(assignment.date));
    const {user}=useContext(AuthContext);

    const handleUpdateAssignments = e =>{
        e.preventDefault();
        const form= new FormData(e.currentTarget);
        const title=form.get('title');
        const marks=form.get('marks');
        const image=form.get('image');
        const difficulty=form.get('difficulty');
        const date= startDate.toISOString().split('T')[0];
        const description=form.get('description'); 
        const email=user.email; 
        const newAssignment={title,marks,image,difficulty,date,description,email}   
        console.log(newAssignment,user.email,assignment.email);

        if(user.email==assignment.email){
            //send data to the server 
        fetch(`https://brand-shop-server-brown-pi.vercel.app/assignments/${assignment._id}`, {
            method: 'PUT',
            // mode: 'no-cors',
            headers:{
                'content-type':'application/json'
            },
            credentials:'include',
            withCredentials: true,
            body: JSON.stringify(newAssignment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount>0){
                    toast("Assignment Updated");
                    // window.location.href = '/assignments';
                }
        })
        }else{
            toast("Unauthorized attempt. You are not the Assignment creator");
        }
        
    }

    const handleDelete = _id =>{
        console.log("fahim")
        event.preventDefault();
        if(user.email==assignment.email){
            
            //send data to the server 
            fetch(`https://brand-shop-server-brown-pi.vercel.app/assignments/${_id}`, {
                method: 'DELETE',
                headers:{
                    'content-type':'application/json',
                    // mode: 'no-cors'
                },
                credentials:'include',
                withCredentials: true,
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.deletedCount >0){
                        toast("Assignment Deleted");
                    }
            })
        }else{
            toast("Unauthorized attempt. You are not the Assignment creator");
        }

        
    }

    

    return (
        <div className="add-product-section max-w-6xl mx-auto py-16 font-rajdhani">
            <div className="title text-center mb-10">
                <h1 className="font-bold font-rajdhani text-6xl">Update Assignment</h1>
            </div>
            <div className="w-full p-8 mt-6 overflow-hidden bg-white rounded-md border-2 border-red-500  sm:rounded-lg mx-auto">
                    <form onSubmit={handleUpdateAssignments}  className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Title
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={assignment.title}
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Marks
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="marks"
                                    defaultValue={assignment.marks}
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            
                        </div>
                        <div>
                            <label
                                htmlFor="brand"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Thumbnail Image URL
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="image"
                                    defaultValue={assignment.image}
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            
                        </div>
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Assignment Difficulty
                            </label>
                            <div className="flex flex-col items-start w-full px-4 py-2 mt-3  bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40">
                                <select 
                                    name="difficulty"
                                    defaultValue={assignment.difficulty}
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                {/* <input
                                    type="text"
                                    name="difficulty"
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                /> */}
                            </div>
                            
                        </div>
                        
                        <div>
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
                                    defaultValue={assignment.description}
                                    className="textarea textarea-bordered block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40">
                                </textarea>
                            </div>
                            
                        </div>
                        <div>
                            <label
                                htmlFor="text"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Due Date
                            </label>
                            <div className="flex flex-col items-start font-bold text-xl w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40">
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            
                        </div>
                        
                        
                        <div className="col-span-2 items-center mt-4 ">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500 text-2xl font-bold">
                                Update Assignment
                            </button>
                        </div>
                        <div className="col-span-2 items-center mt-4 ">
                            <button onClick={()=>handleDelete(assignment._id)} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500 text-2xl font-bold">
                                Delete Assignment
                            </button>
                        </div>
                    </form>
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

export default UpdateAssignment;