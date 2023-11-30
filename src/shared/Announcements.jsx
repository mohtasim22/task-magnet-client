import { useEffect, useState } from "react";

const Announcements = () => {

    const [announcements,setAnnouncements] = useState([]);
    useEffect(()=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/announcements`)
        .then(res =>res.json()
        )
        .then((data) =>{
            setAnnouncements(data);
        }
        )
        
    },[])
    console.log(announcements.length)
    return (
        <div className="mb-10 pl-7 pr-7">
            {announcements.length== 0?
                <div></div>
                :
                <div className="max-w-6xl mx-auto ">
                <div className='title font-rajdhani text-3xl md:text-5xl font-extrabold text-center pt-12 pb-6'>
                    <h1>Announcements</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-5">
                    {announcements.map((announcement)=>(
                        <div key={announcement._id} className="card card-compact ">
                            <div className="card-body flex-row">
                                <div className="post-author">
                                    <img src={announcement.image} alt="" />
                                </div>
                                <div className="post-content">
                                    <h2 className="text-left font-bold  text-2xl">{announcement.title}</h2>
                                    <p className="card-txt text-lg">{announcement.name}</p>
                                    <p className="card-txt text-lg font-bold">{announcement.description}</p>
                                </div>

                            </div>
                        </div>
                    ))}                 
                </div>
            </div>
            }
        </div>
    );
};

export default Announcements;