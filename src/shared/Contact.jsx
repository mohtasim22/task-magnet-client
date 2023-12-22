
const Contact = () => {
    return (
        <div className="max-w-6xl mx-auto my-10 text-center">
            <h2 className='title text-3xl md:text-5xl font-extrabold text-center pt-12 pb-6'>Contact Us</h2>
            <p className='text-center text-xl p-8'>
                Have questions or need assistance? Feel free to reach out to us. We are here to help!
            </p>

            <div className="text-xl my-5">
                <h3 className="text-xl font-bold">Email</h3>
                <p>
                For general inquiries: <a href="mailto:info@example.com">info@example.com</a>
                </p>
                <p>
                For support: <a href="mailto:support@example.com">support@example.com</a>
                </p>
            </div>

            <div  className="text-xl  my-5">
                <h3 className="text-xl font-bold">Phone</h3>
                <p>
                Call us at: <a href="tel:+123456789">+123 456 789</a>
                </p>
            </div>

            <div  className="text-xl  my-5">
                <h3 className="text-xl font-bold">Address</h3>
                <p>
                Visit us at:
                <br />
                TaskMagnet
                <br />
                Street Address
                <br />
                City, Country, ZIP Code
                </p>
            </div>
        </div>
    );
};

export default Contact;