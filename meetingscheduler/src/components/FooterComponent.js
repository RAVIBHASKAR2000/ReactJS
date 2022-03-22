import React from 'react';
function Footer (props){
    return(
        <div className="footer">
            <div className="container">
            <div className="row justify-content-center"> 
                <div className="col-7 col-sm-5">
                    <h4>Contact us</h4>
                        <address>
                        Near Gangamma Temple, Gangamma Cirle, Air Force Station jalahalli(East), Bangalore<br />
                        Karnataka<br />
                        <i className="fa fa-phone fa-lg"></i>: 9845629454<br />
                        <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:bhaskarravi2000@gmail.com" className="email">
                        bhaskarravi2000@gmail.com</a>
                        </address>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
            </div>
            </div>
        </div>
        

    );

}

export default Footer;