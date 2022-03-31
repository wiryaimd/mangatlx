import Navigation from "../components/Navigation";
import sample1 from "../img/sample1.jpg";


const Collections = function(){

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    return (
        <div className="bg-light">

            <Navigation />
            
            <div className="container-fluid pt-5">

                <div className="input-group mt-5">
                    <span className="input-group-text bi bi-search px-3"></span>
                    <input id="coll-input" type="url" className="form-control py-2" placeholder="Translated name..."></input>
                    <button className="btn btn-success px-4 font-popp-400">Search</button>
                </div>

                <div className="row">
                    {
                        data.map(function(val, index){
                            return (
                                <div className="col-6 col-md-4 col-lg-3 mt-3" key={index}>
                                    <div className="card p-1">
                                        <img src={sample1} className="card-img-top img-crop" alt="img1.jpg"></img>
                                        <div className="card-body" role="button">
                                            <p className="card-title my-0 lh-1 font-popp-500">Anjim bett aowkaowko kont dont ol ixixi hayuu papale lpaplapea</p>
                                            <p className="card-text my-0 fw-light">Pub: Wiryaimd</p>
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

export default Collections;