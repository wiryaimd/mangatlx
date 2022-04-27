import Navigation from "../components/Navigation";
import SaveResult from "../components/SaveResult";
import sl1 from "../img/sl1.jpg";
import sample1 from "../img/sample1.jpg";
import sample2 from "../img/sample2.jpg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const TlxResult = function(){

    let tlxParams = useParams();
    console.log("tl id res: " + tlxParams.tlId);

    let { state } = useLocation();
    let tlxModel = state;

    let userData = JSON.parse(localStorage.getItem("userdata"));
    let navigate = useNavigate();

    let tlxRaw = {
        tlId: -1,
        title: "",
        description: "",
        dirId: "",
        publisher: "",
        isShare: false,
        pathList: []
    };

    if(state != null){
        console.log(tlxModel);
        console.log(tlxModel.isShare);

        tlxRaw = tlxModel;
    }

    let [tlxData, setTlxData] = useState(tlxRaw);

    let isOwner = false;
    if(tlxData.title.length == 0 && tlxData.pathList.length == 0){
        axios.get(`http://localhost:8080/result?id=${tlxParams.tlId}`).then(function(res){
            console.log("status: " + res.status);
            if(res.status == 200){
                let data = JSON.parse(JSON.stringify(res.data));
                console.log("share: " + data.isShare);

                setTlxData(data);

                isOwner = userData.username == data.publisher;
            }
        }).catch(function(e){
            console.log(e);
        });
    }else{
        if(userData != null){
            isOwner = userData.username == tlxData.publisher;
        }
    }

    function setShareValue(val){
        tlxData.isShare = val;
    }

    return (
        <div className="bg-light">
            <Navigation />

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-12">
                        {
                            tlxData.pathList.map(function(val, index){
                                let imgUrl = `http://localhost:8080/translated/${tlxData.dirId}/${tlxData.pathList[index]}`

                                return(
                                    <div className="row" key={val}>
                                        <div className="col-12 col-lg-6 px-0 px-md-5 order-1 order-lg-0 mt-3">
                                            <img src={imgUrl} className="w-100" />
                                        </div>

                                        { index == 0 &&
                                            <div className="col-12 col-lg-5 order-0 order-lg-1 ">
                                                <SaveResult tlxData={tlxData} isOwner={isOwner} shareValue={setShareValue}/>
                                            </div>
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TlxResult;