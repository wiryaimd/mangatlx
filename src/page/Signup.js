import Navigation from "../components/Navigation";

const Signup = function(){
    return(
        <div className="bg-light">

            <Navigation />

            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">

                <div className="col-12">

                    <div className="row d-flex justify-content-center">

                        <div className="col-12 col-md-8 col-lg-5 bg-white border rounded-3 d-flex justify-content-center">
                            <div className="row mt-5 px-5">
                                <div className="col-12 d-flex justify-content-center mb-3">
                                    <h5 className="font-popp-600">MangaTLX Sign Up</h5>
                                </div>

                                <div className="col-12">
                                    <input type="email" className="form-control" placeholder="Email..."></input>
                                </div>

                                <div className="col-12">
                                    <input type="text" className="form-control my-3" placeholder="Username..."></input>
                                </div>

                                <div className="col-12">
                                    <input type="password" className="form-control mb-3" placeholder="Password"></input>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-success w-100 rounded-pill font-popp-600">Sign Up</button>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-primary w-100 rounded-pill font-popp-500 mt-4 mb-5">I have account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Signup;