import Navigation from "../components/Navigation";
import SaveResult from "../components/SaveResult";
import sl1 from "../img/sl1.jpg";
import sample1 from "../img/sample1.jpg";
import sample2 from "../img/sample2.jpg";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const TlxResult = function(){
    const imgs = [sample1, sample2];

    let tlxParams = useParams();
    console.log("tl id res: " + tlxParams.tlId);

    let { state } = useLocation();
    let tlxModel = state;

    let tlxRaw = {
        title: "",
        description: "",
        dirId: "",
        pathList: []
    };

    if(state != null){
        console.log(tlxModel);
        console.log(tlxModel.title);

        tlxRaw = tlxModel;
    }

    let [tlxData, setTlxData] = useState(tlxRaw);

    if(tlxData.title.length == 0 && tlxData.pathList.length == 0){
        axios.get(`http://localhost:8080/result?id=${tlxParams.tlId}`).then(function(res){
            console.log("status: " + res.status);
            if(res.status == 200){
                let data = JSON.parse(JSON.stringify(res.data));
                setTlxData(data);
            }
        }).catch(function(e){
            console.log(e);
        });
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
                                                <SaveResult tlxData={tlxData} />
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