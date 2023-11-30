import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const LogIn = () => {
    const {signIn}=useContext(AuthContext);
    const {user}=useContext(AuthContext);
    console.log(user)
    const location=useLocation();
    const navigate=useNavigate();
    const auth= getAuth();
    const provider =new GoogleAuthProvider();
    // eslint-disable-next-line no-unused-vars
    const [errors,setError]=useState('');
    // eslint-disable-next-line no-unused-vars
    const [success,setSuccess]=useState('');
    
    const handleGoogleSignIn = () =>{
        signInWithPopup(auth,provider)
        .then(result=>{
            console.log(result.user);
            setSuccess('User Created Sucessfully');
            toast("Logged in Sucessfully");
            const useInfo= {
                name: result.user.displayName,
                email: result.user.email,
                image: result.user.photoURL,
                badge: 'silver',
                isAdmin: 'false'

            }
            fetch('https://assignment-12-server-murex-sigma.vercel.app/users', {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(useInfo)
            })
            axios.post('https://assignment-12-server-murex-sigma.vercel.app/jwt',result.user, {withCredentials:true})
            .then(res =>{
                console.log(res.data)
                if(res.data.success){
                    navigate(location?.state ? location.state : '/');
                }
            })
            .then(res =>{
                console.log(res.data)
                if(res.data.success){
                    navigate(location?.state ? location.state : '/');
                }
            })
        })
        .catch(error =>{
            console.error(error);
            setError(error.massage);
            toast(error.message);
        })
    }
    const handleLogin = e =>{
        e.preventDefault();
        const form= new FormData(e.currentTarget);
        const email=form.get('email');
        const password=form.get('password');
        signIn(email,password)
            .then(result=>{
                console.log(result.user);
                setSuccess('Logged in Sucessfully');
                toast("Logged in Sucessfully");
                // const loggedInUser =result.user;
                const user ={email}
                // navigate(location?.state ? location.state : '/');
                axios.post('https://assignment-12-server-murex-sigma.vercel.app/jwt',result.user, {withCredentials:true})
                .then(res =>{
                    console.log(res.data)
                    if(res.data.success){
                        navigate(location?.state ? location.state : '/');
                    }
                })
            })
            .catch(error =>{
                console.error(error);
                setError(error.message);
                toast(error.message);
            })
            
    }
    
    return (
        <div className="relative flex flex-col mx-5 justify-center mt-20 mb-20 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md border-2 border-red-500 lg:max-w-xl font-rajdhani">
                <h1 className="text-2xl font-bold text-center text-red-500 uppercase">
                    Log in
                </h1>
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-sm font-semibold text-red-500 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500">
                            Login
                        </button>
                    </div>
                    
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className="flex mt-4 gap-x-2">
                    <button onClick={handleGoogleSignIn}
                            aria-label="Login with Google"
                            type="button"
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-red-500 font-semibold"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>
                </div>

                <p className="mt-8 text-sm font-semibold text-center text-gray-700">
                    {" "}
                    Dont have an account?{" "}
                    <Link to={"/register"}><a
                        href="#"
                        className="font-bold text-lg text-red-500 hover:underline"
                    >
                        Register here
                    </a></Link>
                    
                </p>
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

export default LogIn;