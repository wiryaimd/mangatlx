import Navigation from "../components/Navigation";
import SaveResult from "../components/SaveResult";
import sl1 from "../img/sl1.jpg";
import sample1 from "../img/sample1.jpg";
import sample2 from "../img/sample2.jpg";

const TlxResult = function(){
    const imgs = [sample1, sample2];

    return (
        <div className="bg-light">
            <Navigation />

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-12">
                        {
                            imgs.map(function(val, index){
                                return(
                                    <div className="row" key={val}>
                                        <div className="col-12 col-lg-6 px-0 px-md-5 order-1 order-lg-0 mt-3">
                                            <img src={imgs[index]} className="w-100" />
                                        </div>

                                        { index == 0 &&
                                            <div className="col-12 col-lg-5 order-0 order-lg-1 ">
                                                <SaveResult />
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