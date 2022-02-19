import 'bootstrap-icons/font/bootstrap-icons.css'; // import icon bootstrap boyy

// gaperlu import ini karena udh di index yach
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js'; // perlu untuk collapse navbar nya yachh

const Navigation = function(){

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
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="/translatex">TranslateX</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Collections</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Account</a>
                            </li>
                        </ul>
                    </div>

                </div>

            </nav>
        </div>
    );

}

export default Navigation;