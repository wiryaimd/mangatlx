import sl1 from '../img/sl1.jpg';
import sl2 from '../img/sl2.png';

const MainSlide = function(){

    return(
        <div id="main-slide" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={sl1} className="d-block w-100 rounded-3"></img>
                </div>

                {/* <div className="carousel-item">
                    <img src={sl2} className="d-block w-100 rounded-3"></img>
                </div> */}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#main-slide" data-bs-slide="prev">
                <i className="carousel-control-prev-icon" aria-hidden="true"></i>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#main-slide" data-bs-slide="next">
                <i className="carousel-control-next-icon" aria-hidden="true"></i>
            </button>
        </div>
    );

}

export default MainSlide;