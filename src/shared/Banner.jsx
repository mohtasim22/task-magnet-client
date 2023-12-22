import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Banner = () => {
   
    const {user}= useContext(AuthContext);

  
        
    return (
        <div className="banner-section">
            <div className="text-center text-white font-rajdhani banner-section font-bold" data-aos="fade-up" data-aos-duration="1000">
            
                <h1>- Task Magnet -</h1>
                <h2>Task Smarter,</h2>
                <h3>Achieve Greater</h3>
                {
                    user?
                    <div></div>
                    :
                    <div><Link to={"/login"}><button className="btn btn-ghost text-lg">lets Explore</button></Link></div>

                }
                
                
                
            </div>
        </div>
    );
};

export default Banner;