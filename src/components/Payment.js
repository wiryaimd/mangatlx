
import axios from "axios";
import { useRef, useEffect } from "react";

const Payment = function(){

    let userData = JSON.parse(localStorage.getItem("userdata"));

    const paypal = useRef();

    useEffect(function(){
        window.paypal.Buttons(
            {
                createOrder: function(data, actions, err){
                    return actions.order.create(
                        {
                            intent: "CAPTURE",
                            purchase_units: [{
                                descriptions: "Mangatlx Supporter",
                                amount: {
                                    currency_code: "USD",
                                    value: "2.50"
                                }
                            }]
                        }
                    );
                },
                onApprove: async function(data, actions){
                    const order = await actions.order.capture();
                    console.log(order);

                    saveData(order);
                },
                onError: function(err){
                    console.log(err);
                }
            }
        ).render(paypal.current);
    }, []);

    function saveData(dataOrder){
        let res = JSON.parse(JSON.stringify(dataOrder));


        let data = {
            paymentId: res.id,
            payerId: res.payer.payer_id,
            payerEmail: res.payer.email_address,
            email: userData.username
        }

        axios.post("http://localhost:8080/paymentstatus", data, {
            auth: {
                username: userData.username,
                password: userData.password
            }
        }).then(function(res){
            if(res.status !== 200){
                // set err msg // tell to contact dev mnyaawwknyu
                console.log("save data not 200 ");
                return;
            }

            alert("Thankyou for subscribe MangaTLX as Supporter!");

        }).catch(function(err){
            // need to contact dev
            console.log(err);
        });

    }

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}

export default Payment;