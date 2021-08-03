import React,{ useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons"; 
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Login({history}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // Access the user 
    let {user} = useSelector((state) => ({ ...state }));
    // This useEffect helps to, once the user login => user can't access the login page(security purpose)
    useEffect( () => {
      if(user && user.token){
          history.push("/");
        }
    }, [user]);
    let dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(email, password);
        try {
          const result = await auth.signInWithEmailAndPassword(email, password);
         //   console.log(result);
         const {user} = result;
         const idTokenResult = await user.getIdTokenResult();
         dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: user.email,
              token: idTokenResult.token
            }
          });
          history.push("/");
        } catch(error) {
            // console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    }
    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider).then( async (result) => {
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
               type: "LOGGED_IN_USER",
               payload: {
                 email: user.email,
                 token: idTokenResult.token
               }
            });
            history.push("/");
        })
        .catch( (error) => {
            toast.error(error.message);
        });
    }
    const loginForm =  () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" placeholder="Enter your Email" className="form-control" value={email} onChange={ (e) => setEmail(e.target.value)} autoFocus />
            </div>
            <div className="form-group">
             <input type="password" placeholder="Enter your Password" className="form-control" value={password} onChange={ (e) => setPassword(e.target.value)} />
            </div> <br />
            <Button onClick={handleSubmit} type="primary" className="mb-3" block shape="round" icon={<MailOutlined />} size="large" disabled={!email || password.length < 6} > Login with Email/Password </Button>
        </form>
    );
    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <h4 className="text-danger">Login...</h4> : <h4>Login</h4> }
                    {loginForm()}
                    <Button onClick={googleLogin} type="danger" className="mb-3" block shape="round" icon={<GoogleOutlined />} size="large" > Login with Google </Button>
                    <Link to="/forgot/password" className="float-right text-danger">Forgot Password ?</Link>
                </div>
            </div>
        </div>
    );
}
export default Login;