import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Chart } from "react-google-charts";
const AdminProfile = () => {
    const [posts,setposts] = useState([]);
    const userx = useLoaderData();
    const {user}= useContext(AuthContext);
    const filterEmail = user.email;
    
    useEffect(()=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/posts`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setposts(data);
        }
        )
        
    },[])

    const filteredMyPosts = posts.filter((myPost) => myPost.email === filterEmail);
    console.log(filteredMyPosts);

    const filteredMyUser = userx.filter((user) => user.email === filterEmail);
    console.log(filteredMyUser);
    
    const handleCreateTag = e =>{
        e.preventDefault();
        const form= new FormData(e.currentTarget);

        const value=form.get('tag');
        const label=form.get('tag');   
        const newtag={value,label}   
        console.log(newtag);

        //send data to the server 
        fetch('https://assignment-12-server-murex-sigma.vercel.app/tags', {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newtag)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    toast("Posted");
                }else{
                    toast("Tag Exists");
                }
        })

    }
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


     const data = [
        ["Task", "Hours per Day"],
        [`Posts: ${posts.length}`, posts.length],
        [`Comments: ${comments.length}`, comments.length],
        [`Users: ${users.length}`, users.length],
      ];
      
     const options = {
        title: "Site Stats",
        is3D: true,
      };

    return (
        <div className="max-w-6xl mx-auto text-white">
            <h2 className="text-3xl font-bold">Admin Profile</h2>
            <img className="mt-6 w-40" src={filteredMyUser[0].image} alt="" />
            <h2 className="text-2xl mt-4">Name: {filteredMyUser[0].name}</h2>
            <h2 className="text-2xl mt-4">Email: {filteredMyUser[0].email}</h2>
            <div className='pie-chart'>
                <h2 className="text-2xl mt-4 font-bold">Pie Chart</h2>
                <Chart
                className='mt-5'
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"500px"}
                />
            </div>
            <div className='tag-create text-white mt-10'>
                <div>
                    <label
                        htmlFor="type"
                        className="block text-2xl font-semibold text-white undefined"
                    >
                        Create Tag
                    </label>
                    <div className="flex flex-col items-start">
                        <form action="" className='flex' onSubmit={handleCreateTag}>
                            <input
                                type="text"
                                name="tag"
                                placeholder='Create Tag'
                                className="block w-50 px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            <button className='btn mt-5 ml-3'>Add Tag</button>
                        </form>
                        

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

export default AdminProfile;