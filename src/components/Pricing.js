import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";



const Pricing = function(props){

    const [isCheckout, setCheckout] = useState(false);
    const [payed, setPayed] = useState(false);

    let userData = JSON.parse(localStorage.getItem("userdata"));

    let navigate = useNavigate();

    function toTlx(){
        navigate("/translatex");
    }

    function handleCheckout(){
        if(userData === null){
            navigate("/login");
            return;
        }

        axios.get("http://localhost:8080/testapi").then(function(res){
            if(res.status !== 200){
                alert("Server currently down, please wait until it turn back");
                return;
            }

            setCheckout(true);
        }).catch(function(e){
            alert("Server currently down, please wait until it turn back");
        });
    }

    function setPayedStatus(status){
        setPayed(status);
    }

    return(
        <div className="row">
            <div className="col-12 col-md-6 mt-5">
                <div className="d-flex justify-content-center">
                    <div className="w-75">
                        <h4 className="font-popp-600 text-color2 text-center">Free</h4>
                        <div className="card mt-3">
                            <div className="card-body">
                                <h4 className="card-title font-popp-600 text-color2">0$</h4>
                                <ul className="card-text">
                                    <li>Translate up to 30 pages/day</li>
                                </ul>

                                <button className="btn btn-primary" onClick={toTlx}>Start TLX</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-5">
                <div className="d-flex justify-content-center">
                    <div className="w-75">
                        <h4 className="font-popp-600 text-color2 text-center">Supporter</h4>
                        <div className="card mt-3">
                            <div className="card-body">
                                <h4 className="card-title font-popp-600 text-color2">2$ / Month</h4>
                                <ul className="card-text">
                                    <li>Translate up to 200 pages/day</li>
                                    <li>Support 50+ Languages source</li>
                                    <li>No Ads</li>
                                    <li>Help this poor developer to make this translator better</li>
                                </ul>
                                { props.premium || payed ? 
                                    <button className="btn btn-success w-100">Thankyou for Subscribe!</button>
                                :  (isCheckout ? 
                                    <Payment paystatus={setPayedStatus} /> : 
                                    <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>)
                                
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;