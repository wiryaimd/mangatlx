import 'bootstrap-icons/font/bootstrap-icons.css'; // import icon bootstrap boyy
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

// gaperlu import ini karena udh di index yach
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js'; // perlu untuk collapse navbar nya yachh

const Navigation = function(props){

    let [open, setOpen] = useState(false);
    let accMenu = useRef();

    let navigate = useNavigate();
    
    let userData = localStorage.getItem("userdata");
    let logged = false;

    if(userData != null){
        logged = true;
    }

    function handleAccMenu(){
        if(open){
            // accMenu.current.style.display = "none";
            setOpen(false);
            return;
        }

        // accMenu.current.style.display = "block";
        setOpen(true);
        
    }

    function logout(){
        localStorage.removeItem("userdata");
        navigate("/login");
        // referesh navigation
        // nvm
    }

    return (
        <div>

            { open &&
                <div className="position-absolute mt-5 p-3 end-0 bg-light border rounded-3 w-25 mx-3 zindex-hundred" ref={accMenu}>
                    <h5>Wiryaimd Wanjay</h5>

                    <div className="row">
                        <div className="col-12">
                            <a href="#">My Collections</a>
                        </div>
                        <div className="col-12">
                            <a href="#" onClick={logout}>Logout</a>
                        </div>
                    </div>
                </div>
            }


            {/* membuat navigation */}
            <nav className="navbar navbar-expand-md bg-light fixed-top bg-white border-bottom">

                <div className="container-fluid">
                    {/* class navbar-brand ntuk menandakan ini title */}
                    <a className="navbar-brand" href="/">MangaTLX</a>
                    
                    {/* membuat collapse button saat web diperkecil gituch */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Menumboy">
                        <span className="bi bi-list"></span>
                    </button>

                    {/* yang terelasi dari togglernya dengan child nya ini */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link"><i className="bi bi-house-door ms-3"></i> Home</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link to="/translatex" className="nav-link"><i className="bi bi-translate ms-3"></i> Tlx</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/collections" className="nav-link"><i className="bi bi-box-seam ms-3"></i> Collections</Link>
                            </li>

                            <li className="nav-item">
                                {logged ?
                                    <Link to="#" className="nav-link" onClick={handleAccMenu}>
                                        <i className="fa fa-user ms-3"></i> Account
                                    </Link>
                                    : 
                                    <Link to="/login" className="nav-link">
                                        Sign In
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    );

}

export default Navigation;