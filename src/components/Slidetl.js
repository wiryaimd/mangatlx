import sl3 from '../img/sl3.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Slidetl = function(){

    let navigate = useNavigate();


    let [tlxData, setTlxData] = useState([]);

    useEffect(function(){
        console.log("data load check: ");
        axios.get("http://localhost:8080/collectionsHome").then(function(res){
            console.log("collections home status: " + res.status);
            if(res.status != 200){
                return;
            }

            let resData = JSON.parse(JSON.stringify(res.data));
            setTlxData(resData);
        }).catch(function(e){
            console.log("data err: " + e);
        })
    }, []);

    function handleTitleClick(index){
        let data = tlxData[index];
        let tlxUrl = "/result/" + data.tlId;

        navigate(tlxUrl);
    }


    const slideSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
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
                    tlxData.map(function(num, index){
                        let data = tlxData[index];
                        let fImg = `http://localhost:8080/translated/${data.dirId}/${data.pathList[0]}`;

                        return (
                            <div className="card p-1" key={index}>
                                <img src={fImg} className="card-img-top img-crop" alt={fImg}></img>
                                <div className="card-body">
                                    <h5 className="card-title" role="button" onClick={() => handleTitleClick(index)}>{data.title}</h5>
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