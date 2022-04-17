

const SaveResult = function(props){

    let data = props.tlxData;

    return(
        <div className="container-fluid mt-4 mt-sm-5" >
            <div className="bg-white border rounded-3">
                <div className="row px-3 pt-3">
                    <div className="col">
                        <h3 className="">Translated Result</h3>
                    </div>
                </div>

                <div className="row px-3">
                    <div className="col">
                        <p className="font-popp-400">{data.pathList.length} Image Translated</p>
                    </div>
                </div>

                <div className="row px-3">
                    <div className="col-12 bg-light px-3 py-2">
                        <p className="my-0 font-popp-600">{data.title}</p>
                        <p className="my-0 font-popp-400">Publisher: <a href="#">{data.publisher}</a></p>
                        <p className="font-popp-400">Date: 08-Mar-2022</p>
                    </div>
                </div>

                <div className="row px-3 mt-3">
                    <div className="col">
                        <i className="bi bi-clipboard2 p-1" role="button"></i>
                        <a className="px-1" href="https://mangatlx.my.to/result?id=2334523">https://mangatlx.my.to/result?id=2334523</a>
                    </div>
                </div>

                <div className="d-flex mt-3">
                    <div className="col-6 m-0 p-0 d-flex">
                        <button className="btn btn-success w-100 rounded-0 font-popp-400 p-2 ">Download PDF</button>
                    </div>

                    <div className="col-6">
                        <button className="btn btn-secondary w-100 rounded-0 font-popp-400 p-2">Save to Collections</button>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default SaveResult;