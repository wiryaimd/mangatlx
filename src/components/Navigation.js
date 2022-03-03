import 'bootstrap-icons/font/bootstrap-icons.css'; // import icon bootstrap boyy
import { Link } from 'react-router-dom';

// gaperlu import ini karena udh di index yach
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js'; // perlu untuk collapse navbar nya yachh

const Navigation = function(){
    
    let userData = localStorage.getItem("userdata");
    let logged = false;

    if(userData != null){
        logged = true;
    }

    return (
        <div>
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
                                <Link to="/" className="nav-link"><i className="bi bi-house-door"></i></Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link to="/translatex" className="nav-link"><i className="bi bi-translate"></i></Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/collections" className="nav-link"><i className="bi bi-box-seam"></i></Link>
                            </li>

                            <li className="nav-item">
                                {logged ?
                                    <Link to="/account" className="nav-link">
                                        <i className="fa fa-user"></i>
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