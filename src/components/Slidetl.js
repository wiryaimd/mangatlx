import sl3 from '../img/sl3.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Slidetl = function(){

    const mainData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const slideSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }
        ]
    }

    return(
        <div>
            <Slider {...slideSettings} className="mx-2 mx-sm-4">
                {
                    mainData.map(function(num, index){
                        return (
                            <div className="card p-1" key={num}>
                                <img src={sl3} className="card-img-top" alt="tl-result.jpg"></img>
                                <div className="card-body">
                                    <h5 className="card-title">Anjim bett</h5>
                                </div>
                            </div>
                        );
                    })
                }
            </Slider>

        </div>
    );
}

export default Slidetl;