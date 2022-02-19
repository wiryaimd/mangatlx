// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';
import MainSlide from './components/MainSlide';

import Footer from './components/Footer';

import Slidetl from './components/Slidetl';
import Tlx from './Tlx';

const Main = function(){

    return (
        <div>

            <Navigation />

            <div className="container-fluid pt-5">

                <div className="row px-5 pt-5 align-items-center" style={{"backgroundColor": "#f1f1f1"}}>
                    <div className="col-md-7 col-lg-6 mb-5">
                        <MainSlide />
                    </div>

                    <div className="col-md-5 col-lg-6 ps-3">
                        <h4>Automatically translate Manga/Manhwa/Manhua or other Comics to any languages you want</h4>
                        <p className="font-popp-400">Fast translation up to 60+ languages. This web will atuomatically detect text in image, auto translate text and draw text automatically</p>

                        <button className="btn btn-primary px-5 py-2 mt-2 mb-5">Start Translate</button>
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
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/translatex" element={<Tlx />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
