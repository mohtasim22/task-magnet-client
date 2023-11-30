import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const MakeAnnouncement = () => {
    const [announcements,setAnnouncements] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/announcements`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setAnnouncements(data);
        }
        )
        
    },[])
    const handleDeleteAssn=(id)=>{
        fetch(`http://localhost:5000/announcements/${id}`, {
            method: 'DELETE',
            headers:{
                'content-type':'application/json'
            },
            
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount >0){
                    toast("Announcement Deleted");
                    // window.location.href = '/assignments';
                }
            })
    }
    const handleMakeAnnouncement = e =>{
        e.preventDefault();
        const form= new FormData(e.currentTarget);

        const name=form.get('name');
        const image=form.get('image');
        const title=form.get('title');
        const description=form.get('description');    
        const newPost={name,image,title,description}   
        console.log(newPost);

        //send data to the server 
        fetch('http://localhost:5000/announcements', {
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
            <div className="title text-center mb-10">
                <h1 className="font-bold font-rajdhani text-5xl">Make Annoucement</h1>
            </div>
            <div className="w-full p-8 mt-6 overflow-hidden bg-white rounded-md border-2 border-red-500  sm:rounded-lg mx-auto">
                    <form onSubmit={handleMakeAnnouncement}  className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="name"
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                 Image URL
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="image"
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            
                        </div>
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Title
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="title"
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
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
                                    className="textarea textarea-bordered block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40">
                                </textarea>
                            </div>
                            
                        </div>
                        
                        
                        <div className="col-span-2 items-center mt-4 ">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500 text-2xl font-bold">
                                Announce
                            </button>
                        </div>
                    </form>
                

            </div>
            <div>
                <h2 className="text-3xl font-bold mt-10">Previous Announcements</h2>
                <div className="overflow-x-auto mt-10">
                        <table className="table text-xl">
                            {/* head */}
                            <thead className="text-xl">
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                            {announcements.map((announcement)=>(
                                <tr key={announcement._id}>
                                    <td>{announcement.name}</td>
                                    <td>{announcement.title}</td>
                                    
                                    <td><button onClick={()=>handleDeleteAssn(announcement._id)} className="btn">Delete</button></td>
                                    <td>{announcement.badge}</td>
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

export default MakeAnnouncement;