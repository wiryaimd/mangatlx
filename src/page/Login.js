import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Login = function(){
    let navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();

        console.log("username", e.target.username.value);
        console.log("password", e.target.password.value);

        axios.post("http://localhost:8080/login", {
            username: e.target.username.value,
            password: e.target.password.value
        }).then(function(res){
            let status = res.status;
            console.log("status: ", status);

            if(status != 200){
                return;
            }

            let userData = {
                username: e.target.username.value,
                password: e.target.password.value
            }

            localStorage.setItem("userdata", JSON.stringify(userData));
            navigate("/");
        });
    }

    function toSignup(){
        navigate("/signup");
    }

    return (
        <div className="bg-light">

            <Navigation />

            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">

                <div className="col-12">

                    <div className="row d-flex justify-content-center">

                        <div className="col-12 col-md-8 col-lg-5 bg-white border rounded-3 d-flex justify-content-center">
                            <form className="row mt-5 px-5" onSubmit={handleLogin}>
                                <div className="col-12 d-flex justify-content-center">
                                    <h5 className="font-popp-600">MangaTLX Sign In</h5>
                                </div>

                                <div className="col-12">
                                    <input type="text" name="username" className="form-control my-3" placeholder="Email/Username..."></input>
                                </div>

                                <div className="col-12">
                                    <input type="password" name="password" className="form-control mb-3" placeholder="Password"></input>
                                </div>

                                <div className="col-12">
                                    <input className="btn btn-success w-100 rounded-pill font-popp-600" type="submit" value="Login"></input>
                                </div>

                                <div className="col-12 d-flex justify-content-end mt-1">
                                    <a href="/forgot">Forgot password?</a>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-primary w-100 rounded-pill font-popp-500 mt-4 mb-5" onClick={toSignup}>Create an account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Login;