import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const MyCollections = function(){

    let [tlxData, setTlxData] = useState([]);

    let userData = JSON.parse(localStorage.getItem("userdata"));
    let navigate = useNavigate();

    if(tlxData.length == 0){
        axios.post("http://localhost:8080/collections", 
            {
                username: userData.username
            }, {
                auth: {
                    username: userData.username,
                    password: userData.password
                }
            }).then(function(res){
                if(res.status != 200){
                    console.log("status not 200");
                    return;
                }

                let result = JSON.parse(JSON.stringify(res.data));

                if(result.length == 0){
                    console.log("data zeros...");
                    return;
                }

                setTlxData(result);
                
            }).catch(function(e){
                console.log(e);
            });
    }

    function handleTitleClick(index){
        let data = tlxData[index];
        let tlxUrl = "/result/" + data.tlId;

        navigate(tlxUrl);
    }

    return(
        <div className="bg-light">
            <Navigation />

            <div className="container-fluid pt-5">

                <div className="row">
                    {
                        tlxData.map(function(val, index){
                            let data = tlxData[index];

                            let fImg = `http://localhost:8080/translated/${data.dirId}/${data.pathList[0]}`;

                            return(
                                <div className="col-6 col-md-4 col-lg-3 mt-3" key={index}>
                                    <div className="card p-1">
                                        <img src={fImg} className="card-img-top img-crop" alt="img1.jpg"></img>
                                        <div className="card-body" role="button">
                                            <p className="card-title my-0 lh-1 font-popp-500" role="button" onClick={() => handleTitleClick(index)}>{data.title}</p>
                                            <p className="card-text my-0 fw-light">Pub: {data.publisher}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default MyCollections;