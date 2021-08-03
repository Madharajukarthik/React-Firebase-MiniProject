import React,{ useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify"; 
import { useSelector } from "react-redux";

function ForgotPassword({history}) {
    const [email, setEmail] = useState("");
    // Access the user 
    const [loading, setLoading] = useState(false);
    let {user} = useSelector((state) => ({ ...state }));
    // This useEffect helps to, once the user login => user can't access the forgotPassword page(security purpose)
    useEffect( () => {
        if(user && user.token){
            history.push("/");
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }
        await auth.sendPasswordResetEmail(email, config).then(() => {
            setEmail("")
            setLoading(false)
            toast.success("Check your Email for Password reset link")
        }).catch((error) => {
            setLoading(false);
            toast.error(error.message);
        })
    }
    return(
        <div className="container col-md-6 offset-md-3 p-5"> 
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Forgot Password</h4>}
            <form onSubmit={handleSubmit}>
                <input type = "email" placeholder="Enter your Email" className = "form-control" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus /> <br />
                <button className="btn btn-primary" disabled={!email}>Submit</button>
            </form>
        </div>
    );
}
export default ForgotPassword;