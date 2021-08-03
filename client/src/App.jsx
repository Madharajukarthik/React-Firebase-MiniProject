import React,{ useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Error from "./pages/error/Error";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";

import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { auth } from "./firebase";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged( async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        });
      }
    })
    //cleanup
    return () => unsubscribe();
  }, [])
  return (
    <>
      <Header />
      <ToastContainer />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
