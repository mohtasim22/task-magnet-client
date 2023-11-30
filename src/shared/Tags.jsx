import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Tags = () => {
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
    const tagsArray = options.map(post => post.value);
    return (
        <div className="tags-section">
            <div className='title font-rajdhani text-3xl md:text-5xl font-extrabold text-center pt-12 pb-6'>
                <h1>Tags</h1>
            </div>          
            <div className="services-section font-rajdhani py-8">
            {tagsArray.map((tag)=>(
                <Link key={tag} to={`/posts/${tag}`} ><button  className="btn btn-outline mr-2 lowercase">{tag}</button></Link>
                
            ))}    
            </div>
        </div>
    );
};

export default Tags;