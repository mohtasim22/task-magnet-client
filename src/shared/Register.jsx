import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from "firebase/auth";
const Register = () => {
    const {createUser} = useContext(AuthContext);

    const handleRegister = e =>{
        e.preventDefault();
        const form= new FormData(e.currentTarget);
        const name=form.get('name');
        const photourl=form.get('photourl');
        const email=form.get('email');
        const password=form.get('password');

        const passwordCapitalRegex = /^(?=.*[A-Z])/;
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        // eslint-disable-next-line no-useless-escape
        const passwordSpclCharRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/;
            if(password.length <6){
                toast("Password should be atleast 6 character or longer");
                return;
            }
            else if(!passwordCapitalRegex.test(password)){
                toast("Password should have a capital letter");
                return;
            }
            else if(!urlRegex.test(photourl)){
                toast("Please give valid Image URL");
                return;
            }
            else if(!emailRegex.test(email)){
                toast("Please give valid email");
                return;
            }
            else if(!passwordSpclCharRegex.test(password)){
                toast("Password should have a special character");
                return;
            }
            
            const useInfo= {
                name: name,
                email: email,
                image: photourl,
                badge: 'silver',
                isAdmin: 'false'

            }
        createUser(email,password)
        .then(result=>{
            console.log(result.user);
            updateProfile(result.user, {
                displayName: name, 
                photoURL: photourl,
            });
            
            fetch('http://localhost:5000/users', {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(useInfo)
            })
            toast("User created and logged in Sucessfully");
            window.location.reload();

        })
        .catch(error =>{
            console.error(error);
            toast(error.message);
            
        })
            
    }
    return (
        
        <div>
            <div className="flex flex-col mx-5 font-rajdhani items-center mt-14 mb-20 pt-6 sm:justify-center sm:pt-0 ">
                
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white rounded-md border-2 border-red-500 sm:max-w-lg sm:rounded-lg">
                   
                    <h1 className="text-2xl font-bold text-center text-red-500 uppercase">
                        Register
                    </h1>
                    
                    <form onSubmit={handleRegister}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-800 undefined"
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
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800 undefined"
                            >
                                Photo URL
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="photourl"
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-semibold text-gray-800 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    className="block w-full px-4 py-2 mt-3 text-red-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-sm text-grey-600 font-semibold">
                        Already have an account?{" "}
                        <span>
                            <Link to={"/login"}>
                                <a className="text-red-500 hover:underline text-lg font-bold" href="#">
                                    Log in
                                </a>
                            </Link>
                            
                        </span>
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

export default Register;