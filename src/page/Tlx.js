import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import sl1 from '../img/sl1.jpg';
import axios from "axios";
import { useState, useRef, useEffect } from "react";

import {languageSource, languageSourceId, languageTarget, languageTargetId} from "../util/LanguagesData";
import { useNavigate } from "react-router-dom";

class TlxModel{
    constructor(url, file){
        this.url = url;
        this.file = file;
    }
}

const Tlx = function(props){

    console.log("status uid: " + props.uid);

    let user = JSON.parse(localStorage.getItem("userdata"));

    let navigate = useNavigate();

    let [urlScrap, setUrlScrap] = useState("");
    let [tlxList, setTlxList] = useState([]);
    let [selectedLangSrc, setLangSrc] = useState("id");
    let [selectedLangTarget, setLangTarget] = useState("en");

    let [errMsg, setErrMsg] = useState("");
    let [isErr, setErr] = useState(false);
    let [loading, setLoading] = useState(false);

    function handleProcess(e){

        if(user == null){
            // navigate to slebew
            showErrMsg("User not authenticated.. please login before translate");
            return;
        }

        if(loading){
            console.log("still loading, wait ya");
            return;
        }

        setLoading(true);

        let tlxId = user.username + "-" + props.uid;

        let pathUrl = [];
        for(let i = 0; i < tlxList.length; i++){
            pathUrl.push(tlxList[i].url);
        }

        let data = {
            id: tlxId,
            username: user.username,
            path: pathUrl,
            langSrc: selectedLangSrc,
            langTo: selectedLangTarget
        };

        axios.post("http://localhost:8080/process", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            },
            auth: {
                username: user.username,
                password: user.password
            }
        }).then(function(res){
            console.log("post process complete");
            if(res.status == 200){
                let resData = JSON.parse(res.data);

                console.log(resData);
                return;
            }
            setLoading(false);
            
        }).catch(function(e){
            console.log(e);

            setLoading(false);

            showErrMsg("Something went wrong.. Failed to process image");
        });;
    }

    function showErrMsg(msg){
        setErr(true);
        setErrMsg(msg); // or navigate  to login page
    }

    function handleRemoveClick(index){
        // let data = [...imgList];
        // let fileData = [...previewImg];

        let tlxData = [...tlxList];
        tlxData.splice(index, 1);
        setTlxList(tlxData);

        // data.splice(index, 1);
        // fileData.splice(index, 1);

        // setPreviewImg(fileData);
        // setImgList(data);
    }

    function handleCloseError(){
        setErr(false);
    }

    function handleInputUrl(e){
        setUrlScrap(e.target.value);
    }

    function handleScrapImg(e){
        e.preventDefault();

        if(user == null){
            showErrMsg("User not authenticated.. please login before translate"); // or navigate to login page..
        }

        if(loading){
            console.log("still loading, wait ya");
            return;
        }

        setLoading(true);

        console.log(user.username);
        console.log(user.password);

        let data = {
            url: urlScrap
        }

        axios.post("http://localhost:8080/find", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            },
            auth: {
                username: user.username,
                password: user.password
            }
        }).then(function(res){
            if(res.status === 200){
                let data = JSON.parse(JSON.stringify(res.data));
                console.log("cek ecekekckc: ", data);
                console.log(data.url);
                console.log(data.imgList);

                let tlxData = [];
                for(let i = 0; i < data.imgList.length; i++){
                    let tlxModel = new TlxModel(data.imgList[i], null);
                    tlxData.push(tlxModel);
                }
                
                setTlxList(tlxList.concat(tlxData));
            }

            setLoading(false);

        }).catch(function(err){
            console.log("ngerrrongk: " + err);
            setLoading(false);

            showErrMsg("There is an error in server, try again later..");
        });
    }

    function handleInputImg(e){
        e.preventDefault();

        if(user == null){
            showErrMsg("User not authenticated.. please login before translate"); // or navigate to login page..
        }

        if(loading){
            console.log("still loading, wait ya");
            return;
        }

        setLoading(true);

        let img = [];
        let selectedData = e.target.files;

        const urlImage = Array.from(selectedData).map((file) => URL.createObjectURL(file));
        console.log(urlImage);

        if(tlxList.length + selectedData.length > 12){
            setLoading(false);

            showErrMsg("You dont have permission to translate more than 32 pages");
            return;
        }

        for(let i = 0; i < selectedData.length; i++){
            img.push(selectedData[i].name);
            console.log("selected data: " + selectedData[i].name);
        }

        let formData = new FormData();
        formData.append("uniqId", user.username + "-" + props.uid);
        for(let i = 0; i < selectedData.length; i++){
            formData.append("file", selectedData[i]); // append with File type data for multipart post
        }

        axios.post("http://localhost:8080/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            auth: {
                username: user.username,
                password: user.password
            }
        }).then(function(res){
            setLoading(false);

            console.log("img post complete: " + res.status);
            if(res.status === 200){
                let tlxData = [];
                for(let i = 0; i < selectedData.length; i++){
                    let data = new TlxModel(img[i], urlImage[i]);
                    tlxData.push(data);
                }

                setTlxList(tlxList.concat(tlxData));

                Array.from(selectedData).map(function(file){
                    URL.revokeObjectURL(file);
                });
                return;
            }

            showErrMsg("Something went wrong when uploading image..");

        }).catch(function(e){
            setLoading(false);

            
            showErrMsg("There is an error in server when uploading image, try again later..");
        });
    }

    function langSrc(e){
        console.log("lang src select: " + e.target.value);
        setLangSrc(e.target.value);
    }

    function langTarget(e){
        console.log("lang target select: " + e.target.value);
        setLangTarget(e.target.value);
    }

    return(
        <div className="bg-light">
            <Navigation />

            <div className="container-fluid pt-5 bg-light min-vh-100">

                <div className="row mt-4 mx-3">
                    <div className="col-lg-6">
                        <label htmlFor="tlxInputUrl" className="form-label fw-light">URL of Chapter from Web Commics</label>
                        <div className="input-group">
                            <span className="input-group-text bi bi-link-45deg px-3"></span>
                            <input id="tlxInputUrl" type="url" className="form-control input-style" placeholder="Chapter URL" onChange={handleInputUrl}></input>
                            <button className="btn btn-success px-4" onClick={handleScrapImg}>Find</button>
                        </div>

                    </div>

                    <div className="col-lg-3 ms-lg-3 mt-3 mt-lg-0">
                        <label htmlFor="tlxInputImg" className="form-label fw-light">Or Select From Local</label>
                        <div className="input-group">
                            <input id="tlxInputImg" type="file" style={{display: "none"}} accept="image/*" multiple onChange={handleInputImg}></input>
                            <label className="input-group-text px-3 ic-folder" htmlFor="tlxInputImg"></label>   
                            <label id="tlx-local" htmlFor="tlxInputImg" role="button" className="input-group-text bg-light">From Local</label>
                        </div>
                    </div>

                </div>

                <div className="row mt-5">
                    <div id="tlx-loading" className="col-12 d-flex justify-content-center">
                        { loading &&
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading..</span>
                            </div>
                        }
                    </div>

                </div>

                <div className="row mx-5">
                    <div className="row">
                        { isErr &&
                            <div className="col-12 d-flex bg-danger rounded-3">
                                <i className="bi bi-exclamation-circle text-white m-2"></i>
                                <p className="font-popp-400 text-white m-2">{errMsg}</p>
                                <i className="bi bi-x-lg align-items-end text-white m-2 ms-auto" role="button" onClick={handleCloseError}></i>
                            </div>
                        }
                    </div>
                </div>
                
                <div className="row bg-white mx-3 rounded-3">
                    <div className="col-12 m-3">
                        <h5 className="font-popp-400">Selected Comics ({tlxList.length})</h5>
                    </div>

                    {
                        tlxList.map(function(num, index){
                            const uid = crypto.randomUUID();
                            let scaleTitle = tlxList[index].url.substring(0, 12) + "... (" + (index + 1) + ")";

                            let isUrl = false;
                            if(scaleTitle.startsWith("http://") || scaleTitle.startsWith("https://") || tlxList[index].file == null){
                                isUrl = true;
                            }

                            return (
                                <div key={uid} className="col-6 col-md-4 col-lg-3 col-xxl-2 py-1 mb-1">
                                    { isUrl ?
                                        <img src={tlxList[index].url} className="img-crop-2 img-thumbnail rounded" alt={tlxList[index].url} title={tlxList[index].url}></img> :
                                        <img src={tlxList[index].file} className="img-crop-2 img-thumbnail rounded" alt={tlxList[index].url} title={tlxList[index].url}></img>
                                    }
                                    

                                    <div className="w-100 d-flex align-item-center mt-1">
                                        {/* <i className="ic-folder"></i> */}
                                        <p className="font-popp-400 mt-auto mx-2" title={tlxList[index].url}>{scaleTitle}</p>
                                        <i className="bi bi-x-lg ms-auto" role="button" onClick={() => handleRemoveClick(index)}></i>
                                    </div>
                                </div>
                            );
                        })
                        
                    }
                    
                </div>

                <div className="row mt-5 mx-3 bg-n1 px-4 pt-4 pb-5 rounded-3 d-flex">
                    <div className="col-12 col-sm-4 mt-3 mt-sm-0">
                        <label htmlFor="tlx-src" className="font-popp-400 text-light">Language Source</label>
                        <select id="tlx-src" className="form-select mt-1 p-2 font-popp-600" onChange={langSrc}>
                            {
                                languageSource.map(function(num, index){
                                    return (
                                        <option value={languageSourceId[index]} key={index}>{languageSource[index]}</option>
                                    );
                                })
                            }
                        </select>
                    </div>

                    <div className="col-12 col-sm-4 mt-3 mt-sm-0 mb-3">
                        <label htmlFor="tlx-target" className="font-popp-400 text-light">Language Target</label>
                        <select id="tlx-target" className="form-select mt-1 p-2 font-popp-600" onChange={langTarget}>
                            {
                                languageTarget.map(function(num, index){
                                    return (
                                        <option value={languageTargetId[index]} key={index}>{languageTarget[index]}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center w-100 space-neg-1">
                            <button className="btn btn-primary w-25 p-3 rounded-pill font-popp-600" onClick={handleProcess}>Process</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-dark mt-5">
                <Footer />
            </div>

        </div>
    );
}

export default Tlx;