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
import MyCollections from './page/MyCollections';
import Pricing from './components/Pricing';

const Main = function(){

    let navigate = useNavigate();


    // jadi gini borr, useEffect itu bakal ngerun code di tengahnya itu saat ada web nge rerender ulang yaa, trus ada array di param kedua juga bisa dipake untuk menentukan state mana yg bakal di listen ketika state tersebut menyebabkan render ulang yekannntod
    // useEffect(function(){
    //     console.log("menganjae anjae aowkawokawo");
    // }, [dataStateBorr]);
    
    function handleStart(){
        navigate("/translatex");
    }

    return (
        <div>
            <Navigation />

            <div className="container-fluid pt-5">

                <div className="row px-2 px-sm-5 pt-5 align-items-center bg-sprinkle">
                    <div className="col-12 col-lg-6 mb-5">
                        <MainSlide />
                    </div>

                    <div className="col-12 col-lg-6 ps-3">
                        <h4 className="font-inter-1 text-color2">Automatically translate <span className="text-color1">Manga / Manhwa / Manhua</span> or other Comics to any languages you want</h4>
                        <p className="font-inter-2 mt-5">Fast translation up to 60+ languages. This web will atuomatically detect text in image, auto translate text and draw text automatically</p>

                        <button className="btn btn1 px-5 py-2 mt-2 mb-5" onClick={handleStart}>Start Translate</button>
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col-12 ms-3 mt-4 mb-2">
                        <div className="d-flex justify-content-between">
                            <h5 className="font-popp-600 text-color2">Translated Result</h5>
                            {/* <a href="#">Browse All</a> */}
                        </div>
                    </div>

                    <div className="col">
                        <Slidetl />
                    </div>

                </div>

                <div className="row">
                    <Pricing />
                </div>

            </div>
            
            <div className="container-fluid mt-5 bg-dark">
                <Footer />
            </div>

        </div>
    );
}

function App() {
    let uidm = (Date.now().toString(36) + Math.random().toString(36).substring(2)).substring(0, 8);
    console.log(uidm);
    // const uid = crypto.randomUUID().substring(0, 8);
    // console.log("uid created: " + uid);

    return (
        <BrowserRouter>

            <ScrollToTop />

            <Routes>
                {/* dalam route bisa ada child path nya lagi dan bisa menentukan index nya */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />}/>

                    <Route path="translatex" element={<Tlx uid={uidm} />} />
                    <Route path="collections" element={<Collections />} />
                    <Route path="result/:tlId" element={<TlxResult />} />

                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="my" element={<MyCollections/>} />
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
