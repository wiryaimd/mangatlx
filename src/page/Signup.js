import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Signup = function(){

    let navigate = useNavigate();

    function signUpListener(e){
        e.preventDefault();

        let email = e.target.email.value;
        let username = e.target.username.value;
        let password = e.target.password.value;

        axios.post("http://localhost:8080/signup", {
            email: email,
            username: username,
            password: password
        }).then(function(res){
            if(res.status != 200){
                return;
            }

            let userData = {
                username: username,
                password: password
            }

            localStorage.setItem("userdata", JSON.stringify(userData));

            navigate("/");
        });
    }

    function toLogin(){
        navigate("/login");
    }

    return(
        <div className="bg-light">

            <Navigation />

            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">

                <div className="col-12">

                    <div className="row d-flex justify-content-center">

                        <div className="col-12 col-md-8 col-lg-5 bg-white border rounded-3 d-flex justify-content-center">
                            <form className="row mt-5 px-5" onSubmit={signUpListener}>
                                <div className="col-12 d-flex justify-content-center mb-3">
                                    <h5 className="font-popp-600">MangaTLX Sign Up</h5>
                                </div>

                                <div className="col-12">
                                    <input type="email" name="email" className="form-control" placeholder="Email..."></input>
                                </div>

                                <div className="col-12">
                                    <input type="text" name="username" className="form-control my-3" placeholder="Username..."></input>
                                </div>

                                <div className="col-12">
                                    <input type="password" name="password" className="form-control mb-3" placeholder="Password"></input>
                                </div>

                                <div className="col-12">
                                    <input type="submit" className="btn btn-success w-100 rounded-pill font-popp-600" value="Sign Up"></input>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-primary w-100 rounded-pill font-popp-500 mt-4 mb-5" onClick={toLogin}>I have account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Signup;