import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import sl1 from './img/sl1.jpg';

const Tlx = function(){

    let selectedData = [1, 2, 3, 4, 5];

    return(
        <div className="bg-light">
            <Navigation />

            <div className="container-fluid pt-5 bg-light">

                <div className="row mt-4 mx-3">
                    <div className="col-lg-6">
                        <label htmlFor="tlxInputUrl" className="form-label fw-light">URL of Chapter from Web Commics</label>
                        <div className="input-group">
                            <span className="input-group-text bi bi-link-45deg px-3"></span>
                            <input id="tlxInputUrl" type="url" className="form-control input-style" placeholder="Chapter URL"></input>
                            <button className="btn btn-success px-4">Find</button>
                        </div>

                    </div>

                    <div className="col-lg-3 ms-lg-3 mt-3 mt-lg-0">
                        <label htmlFor="tlxInputImg" className="form-label fw-light">Or Select From Local</label>
                        <div className="input-group">
                            <input id="tlxInputImg" type="file" style={{display: "none"}}></input>
                            <label className="input-group-text px-3 ic-folder" htmlFor="tlxInputImg"></label>   
                            <label id="tlx-local" htmlFor="tlxInputImg" role="button" className="input-group-text bg-light">From Local</label>
                        </div>
                    </div>

                </div>
                
                <div className="row bg-white mt-5 mx-3 rounded-3">
                    <div className="col-12 m-3">
                        <h5 className="font-popp-400">Selected Comics</h5>
                    </div>

                    {
                        selectedData.map(function(num, index){
                            return (
                                <div key={num} className="col-12 px-5 py-1 d-flex align-items-center justify-content-between border-bottom">
                                    <div className="d-flex">
                                        <i className="ic-folder"></i>
                                        <p className="mt-auto mx-2">lanjaeikana-nananan.jpg</p>
                                    </div>
                                    
                                    <i className="bi bi-x-lg " role="button"></i>
                                </div>
                            );
                        })
                        
                    }
                </div>

                <div className="row mt-5 mx-3">
                    <div className="col-4">
                        <label htmlFor="tlx-src" className="font-popp-400">Language Source</label>
                        <select id="tlx-src" className="form-select mt-1 p-2 font-popp-600">
                            <option value="English">English</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Japan">Japan</option>
                        </select>

                    </div>

                    <div className="col-4">
                        <label htmlFor="tlx-target" className="font-popp-400">Language Target</label>
                        <select id="tlx-target" className="form-select mt-1 p-2 font-popp-600">
                            <option value="English">English</option>
                            <option value="Indonesia">Indonesia</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-5 bg-dark">
                <Footer />
            </div>

        </div>
    );
}

export default Tlx;