import React,{ useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Register({history}){
    const [email, setEmail] = useState("");
    // Access the user 
    let {user} = useSelector((state) => ({ ...state }));
    // This useEffect helps to, once the user login => user can't access the login page(security purpose)
    useEffect( () => {
        if(user && user.token){
            history.push("/");
        }
    }, [user]);
    const handleSubmit = async (e) => {
        // console.log("ENV -->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Email is sent to ${email}. Click the link to complete your Registration.`);
        // save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        //clear the search option empty after user enter email
        setEmail("");
    }
    const registerForm =  () => (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your Email" className="form-control" value={email} onChange={ (e) => setEmail(e.target.value)} autoFocus /> <br />
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
}
export default Register;