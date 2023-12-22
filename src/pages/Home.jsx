import { ToastContainer } from "react-toastify";
import Banner from "../shared/Banner";
import 'react-toastify/dist/ReactToastify.css';
import TargetAudienceSection from "../shared/TargetAudienceSection";

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
            <div className="">
                <div className="max-w-6xl mx-auto "  data-aos="fade-up" data-aos-duration="1000">
                    <TargetAudienceSection></TargetAudienceSection>
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

export default Home;