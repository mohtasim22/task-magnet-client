import { Link } from "react-router-dom";
import logo from "../../src/assets/logo.png"
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
    const [theme, setTheme] = useState("light");
    // localStorage.getItem("theme") ? localStorage.getItem.getItem("theme"):
    const handleDarkMode=(e)=>{
        if(e.target.checked){
            setTheme("dark");
        } else{
            setTheme("light");
        }
    }
    
    useEffect(()=>{
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme",localTheme);
        // document.getElementsByClassName("diff-bg").setAttribute("background-color","black");

        if(theme== "dark"){
            const elements = document.getElementsByClassName('diff-bg');
            const elements2 = document.getElementsByClassName('h-text');
            for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.style.backgroundColor = '#11161b';
            }
            for (let i = 0; i < elements2.length; i++) {
            const element2 = elements2[i];
            element2.style.color = 'white';
            }
        }else{
            const elements = document.getElementsByClassName('diff-bg');
            const elements2 = document.getElementsByClassName('h-text');
            for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.style.backgroundColor = '#f8f8f8';
            }
            for (let i = 0; i < elements2.length; i++) {
                const element2 = elements2[i];
                element2.style.color = 'black';
            }
        }
        

    },[theme]);

    const {user, logOut}=useContext(AuthContext);
    console.log(user);
    console.log(document.getElementsByClassName("diff-bg"));
    
    const filterEmail = user?.email;
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
    const filteredUser = users.filter((myPost) => myPost?.email === filterEmail);
    console.log(filteredUser);

    const handleSignOut=()=>{
        logOut()
        .then(
            window.location.href = '/'
        )
        .catch()
    }
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
    console.log(announcements.length)

    return (
        <div className="header-section">
            <div className="max-w-6xl mx-auto">
            <div className="font-rajdhani py-4">
            <div className="navbar">
            <div className="navbar-start">
                <Link to={"/"}><a className="normal-case text-xl"><img className="logo" src={logo} alt="" /></a></Link>
                
            </div>
            <div className="navbar-center">
            <   ul className="menu menu-horizontal px-1 text-base font-caveat font-bold">
                    <Link to={"/"}><li><a>Home</a></li></Link>
                    <Link to={"/membership"}><li><a>Membership</a></li></Link>
                    {
                    announcements.length==0?
                        <div></div>
                        :
                        
                        <div className="menu menu-horizontal px-1 text-base font-caveat font-bold p-0">
                            <Link to="/announcements"><button className="btn">{announcements.length}</button></Link>
                            
                        </div>
                        
                    }
                </ul>
            </div>
            <div className="navbar-end ml-2">
                <div className="dark-mode-button">
                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onChange={handleDarkMode} />
                        
                        {/* sun icon */}
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                        
                        {/* moon icon */}
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>

                    </label>
                </div>
                
                {
                    user?
                        <div className="user-info flex justify-center items-center">
                        </div>
                        :
                        <div></div>
                        
                }
                {
                    user?
                        <div className="p-0">
                            <details className="dropdown dropdown-end">
                                <summary className="m-1 btn btn-nav">
                                    <div className="avatar">
                                        <div className="rounded-full">
                                            <img src={filteredUser[0]?.image}/>
                                        </div>
                                    </div>
                                </summary>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                    <li><a >{filteredUser[0]?.name}</a></li>
                                    <li><a href="/dashboard/myprofile">Dashboard</a></li>
                                    <li>
                                        <button onClick={handleSignOut} className="btn btn-header btn-ghost text-lg">
                                        Log Out
                                        </button>
                                    </li>
                                </ul>
                            </details>
                        </div>
                        
                        :
                        <Link to={"/login"}><button className="btn btn-ghost text-lg">Join Us</button></Link>
                }
                
                
                
            </div>
            </div>
        </div>
        </div>
        </div>
        
        
    );
};

export default Header;