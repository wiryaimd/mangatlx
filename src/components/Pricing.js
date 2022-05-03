import { useState } from "react";
import Payment from "./Payment";



const Pricing = function(){

    const [isCheckout, setCheckout] = useState(false);

    function toTlx(){
        
    }

    function handleCheckout(){
        setCheckout(true);
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
                                    <li>Translate more than 30 pages/day</li>
                                    <li>Support 30+ Languages source</li>
                                </ul>

                                <button className="btn btn-primary">Start TLX</button>
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
                                    <li>Translate more than 30 pages/day</li>
                                    <li>Support 30+ Languages source</li>
                                </ul>
                                { isCheckout ? 
                                    <Payment /> : 
                                    <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
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