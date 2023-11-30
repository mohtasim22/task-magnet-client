import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
const AddPost = () => {
    const {user} = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState(null);
    const myPosts = useLoaderData();
    console.log(user)
    const filterEmail = user.email;

    
    const filteredPosts = myPosts.filter(item => item?.email === filterEmail);

    // Get the count of items with the specified email
    const postcount = filteredPosts?.length;
    // const postcount = 5;
    console.log(postcount)
    const [users,setusers] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/users`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setusers(data);
        }
        )
        
    },[])
    const filteredUser = myPosts.filter(itemy => itemy?.email === filterEmail);
    const badge=filteredUser?.badge;
    const handleAddPost = e =>{
        e.preventDefault();
        const form= new FormData(e.currentTarget);

        const name=form.get('name');
        const email=form.get('email');
        const image=form.get('image');
        const title=form.get('title');
        const tag=selectedOption.value;
        const upvote= parseInt(form.get('upvote')) ;
        const downvote=parseInt(form.get('downvote'));
        const date= new Date().toISOString().split('T')[0];
        const description=form.get('description');    
        const newPost={name,email,image,title,date,description,tag,upvote,downvote}   
        console.log(newPost);

        //send data to the server 
        fetch('http://localhost:5000/posts', {
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
    
    
    const [options, setOptions] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/tags`)
        .then(res =>res.json()
        )
        .then((data) =>{
            console.log(data)
            setOptions(data);
        }
        )
        
    },[])
    return (
        <div className="add-product-section max-w-6xl mx-auto py-16 font-rajdhani">
            {
                postcount>=5&&badge=='silver'?
                <div className="title text-center mb-10">
                    
                    <h1 className="font-bold font-rajdhani text-xl mt-3">Posts Count: {postcount}</h1>
                    <h1 className="font-bold font-rajdhani text-2xl mt-4">Post more than 5!</h1>
                    <Link to='/membership'><button className="btn mt-6"> Become a Member</button></Link>
                </div>
                :
                <div>
            <div className="title text-center mb-10">
                <h1 className="font-bold font-rajdhani text-5xl">Add Post</h1>
                <h1 className="font-bold font-rajdhani text-2xl mt-5">Post Count: {postcount}</h1>
            </div>
            <div className="w-full p-8 mt-6 overflow-hidden bg-white rounded-md border-2 border-red-500  sm:rounded-lg mx-auto">
                    <form onSubmit={handleAddPost}  className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                htmlFor="email"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="email"
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            
                        </div>
                        <div>
                            <label
                                htmlFor="brand"
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
                        <div>
                            <label
                                htmlFor="tag"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Tag
                            </label>
                            <div className="flex flex-col items-start text-black mt-4">
                                <Select
                                    className="w-full"
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 5,
                                        colors: {
                                        ...theme.colors,
                                        primary25: 'neutral80',
                                        primary: 'black',
                                        },
                                    })}
                                />
                            
                            </div>
                            
                        </div>
                        <div>
                            <label
                                htmlFor="upvote"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                UpVote
                            </label>
                            <div className="flex flex-col items-start">
                                
                            <input
                                    type="number"
                                    name="upvote"
                                    defaultValue='0'
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            
                        </div>
                        <div>
                            <label
                                htmlFor="downvote"
                                className="block text-md font-semibold text-gray-800 undefined"
                            >
                                Down Vote
                            </label>
                            <div className="flex flex-col items-start">
                                
                                <input
                                    type="number"
                                    name="downvote"
                                    defaultValue='0'
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
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
            }
            
            
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

export default AddPost;