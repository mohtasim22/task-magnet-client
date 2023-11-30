import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ManageUsers = () => {
    const users = useLoaderData();

    const handMakeAdmin=(id)=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/users/${id}`, {
            method: 'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({isAdmin:'true'})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount>0){
                    toast("Made Admin");
                    window.location.reload();
                    // window.location.href = '/assignments';
                }
            })
    }
    const handRemoveAdmin=(id)=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/users/${id}`, {
            method: 'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({isAdmin:'false'})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount>0){
                    toast("Admin Removed");
                    window.location.reload();
                    // window.location.href = '/assignments';
                }
            })
    }
    return (
        <div className="max-w-6xl mx-auto text-white">
            <h2 className="text-6xl font-bold">Manage Users</h2>
            <div className="overflow-x-auto mt-10">
                    <table className="table text-xl">
                        {/* head */}
                        <thead className="text-xl">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Subscription Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {users.map((user)=>(
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                
                                <td>{user.isAdmin==='true'? <button onClick={()=>handRemoveAdmin(user._id)} className="btn">Remove Admin</button>:<button onClick={()=>handMakeAdmin(user._id)} className="btn">Make Admin</button>}</td>

                                <td>{user.badge}</td>
                            </tr>
                         ))}  
                        
                        </tbody>
                    </table>
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

export default ManageUsers;