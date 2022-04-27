import axios from "axios";
import { useState } from "react";


const SaveResult = function(props){

    let data = props.tlxData;
    let user = JSON.parse(localStorage.getItem("userdata"));

    let [isShare, setShare] = useState(data.isShare);

    function handleShare(){
        if(user == null){
            console.log("save result user null");
            return;
        }

        let shareStatus = !data.isShare;

        let shareData = {
            tlId: data.tlId,
            isShare: shareStatus
        }
        axios.post("http://localhost:8080/sharestatus", shareData, {
            auth: {
                username: user.username,
                password: user.password
            }
        }).then(function(res){
            if(res.status == 200){
                props.shareValue(shareStatus);
                setShare(shareStatus);
            }
        }).catch(function(e){
            console.log("errr: " + e)
        });
    }

    return(
        <div className="container-fluid mt-4 mt-sm-5" >
            <div className="bg-white border rounded-3">
                <div className="row px-3 pt-3">
                    <div className="col">
                        <h3 className="">Translated Result</h3>
                    </div>
                </div>

                <div className="row px-3">
                    <div className="col">
                        <p className="font-popp-400">{data.pathList.length} Image Translated</p>
                    </div>
                </div>

                <div className="row px-3">
                    <div className="col-12 bg-light px-3 py-2">
                        <p className="my-0 font-popp-600">{data.title}</p>
                        <p className="my-0 font-popp-400">Publisher: <a href="#">{data.publisher}</a></p>
                        <p className="font-popp-400">Date: 08-Mar-2022</p>
                    </div>
                </div>

                <div className="row px-3 mt-3">
                    <div className="col">
                        <i className="bi bi-clipboard2 p-1" role="button"></i>
                        <a className="px-1" href={"https://mangatlx.my.to/result?id=" + data.tlId}>{"https://mangatlx.my.to/result?id=" + data.tlId}</a>
                    </div>
                </div>

                <div className="d-flex mt-3">
                    <div className="col m-0 p-0 d-flex">
                        <button className="btn btn-success w-100 rounded-0 font-popp-400 p-2 ">Download PDF</button>
                    </div>

                    {/* need to fix brooo */}
                    { false &&
                        <div className="col-6">
                            <button className="btn btn-secondary w-100 rounded-0 font-popp-400 p-2" onClick={handleShare}>{ isShare ? "Set to private" : "Share Tlx"}</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SaveResult;