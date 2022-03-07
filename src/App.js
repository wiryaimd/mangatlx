// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';
import MainSlide from './components/MainSlide';

import Footer from './components/Footer';

import Slidetl from './components/Slidetl';
import Tlx from './page/Tlx';
import TlxResult from './page/TlxResult';
import Collections from './page/Collections';
import Login from './page/Login';
import Signup from './page/Signup';
import { useEffect, useState, useRef } from 'react';

const Main = function(){

    let [open, setOpen] = useState();
    let accMenu = useRef();

    let navigate = useNavigate();
    
    function handleStart(){
        navigate("/translatex");
    }

    function handleAccMenu(){
        console.log("eee busett dahhao aowkawokoaw");

        if(!open){


            accMenu.current.style.display = "none";
            setOpen(true);
        }else{
            accMenu.current.style.display = "block";
            setOpen(false);
        }
    }

    function logout(){
        localStorage.removeItem("userdata");

        // referesh navigation
        // nvm
    }

    return (
        <div>
            <Navigation accMenu={handleAccMenu} />

            <div className="position-absolute mt-5 p-3 end-0 bg-light border rounded-3 w-25 mx-3" ref={accMenu}>
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

            <div className="container-fluid pt-5">

                <div className="row px-2 px-sm-5 pt-5 align-items-center" style={{"backgroundColor": "#f1f1f1"}}>
                    <div className="col-md-7 col-lg-6 mb-5">
                        <MainSlide />
                    </div>

                    <div className="col-md-5 col-lg-6 ps-3">
                        <h4>Automatically translate Manga/Manhwa/Manhua or other Comics to any languages you want</h4>
                        <p className="font-popp-400">Fast translation up to 60+ languages. This web will atuomatically detect text in image, auto translate text and draw text automatically</p>

                        <button className="btn btn-primary px-5 py-2 mt-2 mb-5" onClick={handleStart}>Start Translate</button>
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-12 mt-4 mb-2">
                        <div className="d-flex justify-content-between">
                            <h5 className="font-popp-500">Translated Result</h5>
                            <a href="#">Browse All</a>
                        </div>
                    </div>

                    <div className="col">
                        <Slidetl />
                    </div>

                </div>

            </div>
            
            <div className="container-fluid mt-5 bg-dark">
                <Footer />
            </div>

        </div>
    );
}

function App() {
    return (
        <BrowserRouter>

            <ScrollToTop />

            <Routes>
                {/* dalam route bisa ada child path nya lagi dan bisa menentukan index nya */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />}/>

                    <Route path="translatex" element={<Tlx />} />
                    <Route path="collections" element={<Collections />} />
                    <Route path="result" element={<TlxResult />} />

                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function Layout(){
    // outlet untuk render child dari route nya yach
    return(
        <div>
            <Outlet />
        </div>
    );
}

function ScrollToTop(){
    const { pathname } = useLocation();
    useEffect(function(){
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default App;
