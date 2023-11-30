import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
"react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Assignments = () => {

    const [assignments,setAssignments] = useState([]);
    
    // const countx= useLoaderData().length;
    const [count,setCount] = useState(0);
    // console.log(count);
    const [itemsPerPage,setItemsPerPage]= useState(12);
    const [currentPage,setCurrentPage]= useState(0);
    const [difficulty,setDifficulty]= useState('All');
    const numberOfPages= Math.ceil(count/itemsPerPage);
    console.log(assignments);
    const handleItemsPerPage = e =>{
        const val= parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    }
    const handleDifficulty = e =>{
        const val= e.target.value;
        setDifficulty(val);
        setCurrentPage(0);
    }
    
    const pages =[...Array(numberOfPages).keys()];
    useEffect(()=>{
        fetch(`https://brand-shop-server-brown-pi.vercel.app/assignments?page=${currentPage}&size=${itemsPerPage}&difficulty=${difficulty}`)
        .then(res =>res.json()
        )
        .then((data) =>{
            const {count ,result}= data;
            setCount(count)
            setAssignments(result);
        }
        )
        
    },[currentPage,itemsPerPage,difficulty])

    // [currentPage,itemsPerPage,difficulty]
    console.log(count,difficulty);
    return (
        <div className="max-w-6xl mx-auto "> 
            <div className="services-section  text-center margin-y font-rajdhani">
                <div className="title text-center mb-10">
                    <h1 className="font-bold font-rajdhani text-5xl">Assignments</h1>
                </div>
                <div className="title text-center mb-10">
                    <h1 className="font-bold font-rajdhani text-xl mb-5">Filter By Difficulty: <span className="text-red-600">{count}</span> Assignments</h1>
                    <select
                        className="difficulty" 
                        value={difficulty} 
                        onChange={handleDifficulty}
                    >
                        <option value="All">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {assignments.map((assignment)=>(
                    <div key={assignment._id} className="card card-compact ">
                        <div className="card-img flex justify-center items-center">
                            <img src={assignment.image}  />
                        </div>
                        
                        <div className="card-body justify-start">
                            <h2 className="text-left font-bold  text-2xl">{assignment.title}</h2>
                            <p className="card-txt text-lg font-bold">Difficulty: {assignment.difficulty}</p>
                            <p className="card-txt text-lg font-bold">Marks: {assignment.marks}</p>

                            <Link to={`/assignmentsDetails/${assignment._id}`} ><button className="btn">View Assignment</button></Link>
                            <Link to={`/updateAssignment/${assignment._id}`} ><button className="btn">Update Assignment</button></Link>

                            {/* <button  className="btn">View Assignment</button>
                            <button  className="btn">Update Assignment</button> */}
                            
                            
                        </div>
                    </div>
                ))} 
                    
                    
                
                </div>
                <div className="pagination mt-10 text-xl font-bold">
                    {
                        pages.map(page =><button 
                            className={currentPage === page && 'selected'}
                            onClick={()=>setCurrentPage(page)}
                            key={page}>{page}</button>)
                    }
                    <span className="ml-2 text-base">Items per page-</span>
                    <select 
                        value={itemsPerPage} 
                        onChange={handleItemsPerPage}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </select>
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

export default Assignments;