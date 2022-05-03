import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { validateEmail } from "../util/Tools";
import GoogleLogin from "react-google-login";

const Signup = function(){

    let navigate = useNavigate();

    let [loading, setLoading] = useState(false);
    let [errMsg, setErrMsg] = useState("");

    function signUpListener(e){
        e.preventDefault();

        setErrMsg("");

        let email = e.target.email.value;
        let username = e.target.username.value;
        let password = e.target.password.value;

        if(!validateEmail(email)){
            setErrMsg("Invalid Email...");
            return;
        }

        if(username.trim().length == 0 || email.trim().length == 0 || password.length == 0){
            setErrMsg("Username/Email/Password should not empty");
            return;
        }

        setLoading(true);


        axios.post("http://localhost:8080/signup", {
            email: email,
            username: username,
            password: password,
            isPremium: false,
            premiumDate: -1,
            dailyTlx: {
                count: 0,
                day: -1
            }
        }).then(function(res){
            setLoading(false);

            if(res.status != 200){
                setErrMsg("Signup failed, please try again");
                return;
            }

            let userData = {
                username: email,
                password: password
            }

            localStorage.setItem("userdata", JSON.stringify(userData));

            navigate("/");
        }).catch(function(e){
            setLoading(false);

            if(e.response.status == 409){
                setErrMsg("Username or Email already exist");
                return;
            }
            
            setErrMsg("Failed: " + e);
        });
    }

    function toLogin(){
        navigate("/login");
    }

    function signUpGoogle(googleData){
        let data = JSON.parse(JSON.stringify(googleData));
        console.log(data.profileObj.email);
        console.log(data.profileObj.name);
        console.log(data.profileObj.googleId);

        axios.post("http://localhost:8080/signup", {
            email: data.profileObj.email,
            username: data.profileObj.name,
            password: data.profileObj.googleId,
            isPremium: false,
            premiumDate: -1,
            dailyTlx: {
                count: 0,
                day: -1
            }
        }).then(function(res){

            if(res.status != 200){
                setErrMsg("Signup failed, please try again");
                return;
            }

            let userData = {
                username: data.profileObj.email,
                password: data.profileObj.googleId,
            }

            localStorage.setItem("userdata", JSON.stringify(userData));

            navigate("/");
        }).catch(function(e){

            if(e.response.status == 409){
                setErrMsg("Username or Email already exist");
                return;
            }
            
            setErrMsg("Failed: " + e);
        });
    }

    function failureGoogle(result){
        console.log(result);
        setErrMsg(result);
    }

    function handleCloseError(){
        setErrMsg("");
    }


    return(
        <div className="bg-light">

            <Navigation />

            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-sprinkle">

                <div className="col-12">

                    <div className="row d-flex justify-content-center">

                        <div className="col-12 col-md-8 col-lg-5 bg-white border rounded-3 d-flex justify-content-center">
                            <form className="row mt-5 px-5" onSubmit={signUpListener}>
                                <div className="col-12 d-flex justify-content-center mb-3">
                                    <h5 className="font-popp-600">MangaTLX Sign Up</h5>
                                </div>

                                { errMsg.length != 0 &&
                                    <div className="col-12 d-flex my-3 bg-danger rounded-3">
                                        <i className="bi bi-exclamation-circle text-white m-2"></i>
                                        <p className="font-popp-400 text-white m-2">{errMsg}</p>
                                        <i className="bi bi-x-lg align-items-end text-white m-2 ms-auto" role="button" onClick={handleCloseError}></i>
                                    </div>
                                }

                                <div className="col-12">
                                    <input type="text" name="email" className="form-control" placeholder="Email"></input>
                                </div>

                                <div className="col-12">
                                    <input type="text" name="username" className="form-control my-3" placeholder="Username"></input>
                                </div>

                                <div className="col-12">
                                    <input type="password" name="password" className="form-control mb-3" placeholder="Password"></input>
                                </div>

                                <div id="tlx-loading" className="col-12 d-flex justify-content-center my-2">
                                    { loading &&
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading..</span>
                                        </div>
                                    }
                                </div>

                                <div className="col-12">
                                    <input type="submit" className="btn btn-success w-100 rounded-pill font-popp-600" value="Sign Up"></input>
                                </div>

                                <div className="col-12 mt-3 d-flex justify-content-center">
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        buttonText="Signup with Google"
                                        onSuccess={signUpGoogle}
                                        onFailure={failureGoogle}
                                        cookiePolicy="single_host_origin">

                                    </GoogleLogin>
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