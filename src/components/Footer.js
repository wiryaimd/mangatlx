
const Footer = function(){
    return(
        <div className="footer">

            <div className="row px-3 py-5 p-sm-5 bg-dark">
                <div className="col-12 col-md-5">
                    <h5 className="text-white">MangaTLX</h5>
                    <p className="text-light fw-light">(C) 2022 Wiryaimd. All rights reversed</p>
                </div>

                <div className="col">
                    <h5 className="text-white">Contact</h5>
                    <ul>
                        <li><a href="https://github.com/wiryaimd" target="_blank">Github</a></li>
                        <li><a href="#">Discord</a></li>
                        <li><a href="#">Mail</a></li>
                    </ul>
                </div>

                <div className="col">
                    <h5 className="text-white">Apps</h5>
                    <ul>
                        <li><a href="https://play.google.com/store/apps/details?id=com.wiryaimd.mangatranslator" target="_blank">PlayStore</a></li>
                        {/* <li><a href="">API Docs</a></li> */}
                    </ul>
                </div>

                <div className="col">
                    <h5 className="text-white">Help</h5>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Term & Privacy</a></li>
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default Footer;