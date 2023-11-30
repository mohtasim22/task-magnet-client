import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkoutform from "./Checkoutform";
import { ToastContainer } from "react-toastify";

const Membership = () => {

    const stripePromise = loadStripe('pk_test_51OHXguD6YcGJ9kTnixbhramtJL1IYeeCfxk95FzU19Hb1hVohuUfiK38T6ur68r83dUW34a7kK2Xut4GNXuwGxfh004ro0NlA6');
    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl m-10 text-center font-bold">Membership Page</h2>
            <h2 className="text-3xl m-10 text-center font-bold">Pay $5 to get Golden Badge and unlock all featuers</h2>
            <Elements stripe={stripePromise}>
                <div className="max-w-lg m-7 mx-auto">
                    <Checkoutform></Checkoutform>
                </div>
                
            </Elements>
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

export default Membership;