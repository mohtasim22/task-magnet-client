import { ToastContainer } from "react-toastify";
import Banner from "../shared/Banner";
import 'react-toastify/dist/ReactToastify.css';
import Tags from "../shared/Tags";
import Announcements from "../shared/Announcements";
import HomePosts from "../shared/HomePosts";

const Home = () => {


    return (
        <div>
            <div className="top-section">
                <div className="top-section-2">
                    <div className="max-w-6xl mx-auto">
                        
                        <Banner></Banner>
                        
                    </div>
                </div>                      
            </div>
            <div className="diff-bg"  data-aos="fade-up" data-aos-duration="1000">
                <div className="max-w-6xl mx-auto ">
                    <Tags></Tags>
                </div>
                
            </div>
            <div className="">
                <div className="max-w-6xl mx-auto "  data-aos="fade-up" data-aos-duration="1000">
                    <Announcements></Announcements>
                </div>
            </div>
            <div className="">
                <div className="max-w-6xl mx-auto "  data-aos="fade-up" data-aos-duration="1000">
                    <HomePosts></HomePosts>
                </div>
            </div>
            
            {/* <div className="">
                <div className="max-w-6xl mx-auto "  data-aos="fade-up" data-aos-duration="1000">
                    <AddPost></AddPost>
                </div>
            </div> */}
            {/* <div className="">
                <div className="max-w-6xl mx-auto "  data-aos="fade-up" data-aos-duration="1000">
                    <PostDetails></PostDetails>
                </div>
            </div> */}
            {/* <div className="">
                <div className="max-w-6xl mx-auto "  data-aos="fade-up" data-aos-duration="1000">
                    <Comments></Comments>
                </div>
            </div> */}
            {/* <div className="">
                <div className="max-w-6xl mx-auto "  data-aos="fade-up" data-aos-duration="1000">
                    <PostComments></PostComments>
                </div>
            </div> */}
            
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

export default Home;