import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const Checkoutform = () => {

    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [userx,setUserx] = useState(['x']);


    const {user} = useContext(AuthContext);
    const filterEmail = user.email;

    // const filteredUserx = userx.filter((user) => user.email === filterEmail);
    // console.log(userx)
    // console.log(filteredUserx)
    // setUserBadge(filteredUserx[0].badge);

    const [error,setError]= useState('');
    const stripe = useStripe();
    const elements = useElements();
    const price= 5.00;
    
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: price }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));

      fetch(`http://localhost:5000/users`)
      .then(res =>res.json()
      )
      .then((data) =>{
        console.log('Data fetched:', data);
        setUserx(data);
      }
      )

    }, []);
    console.log(userx)
    const filteredUserx = userx.filter((usery) => usery.email === filterEmail);
    console.log(userx)
    console.log(filteredUserx)
    // const userBadge=filteredUserx[0].badge;
    // // console.log(userBadge)
    // setUserBadge(filteredUserx[0]?.badge);
    // console.log(userBadge)
    
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
          }

          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName || 'anonymous',
                  email: user?.email || 'anonymous',
                },
              },
            },
          );
          if(confirmError){
              console.log('confirm error')
          }else{
            console.log('payment Intent',paymentIntent)
            if(paymentIntent.status ==='succeeded'){
              console.log('transaction id',paymentIntent.id)
              setTransactionId(paymentIntent.id)

            fetch(`http://localhost:5000/users/${filteredUserx[0]?._id}`, {
            method: 'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({badge:'gold'})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount>0){
                    toast("Gold badge given");
                    // window.location.href = '/assignments';
                }
            })
            }
          }
    }


    return (
        <div className="text-center">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        border: '1px solid black',
                        fontSize: '18px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                {filteredUserx[0]?.badge=='gold'?
                    <button className="btn mt-10" type="submit" disabled>
                    You are already a Gold member
                </button>
                :
                <button className="btn mt-10" type="submit" disabled={!stripe || !clientSecret}>
                    Pay 
                </button>
                }
                
                <p className="text-red-500">{error}</p>
                {transactionId && <p className="text-green-500 mt-5 font-bold">Your transaction id: {transactionId}</p>}
            </form>
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

export default Checkoutform;