import React from "react";
import { jsx, Global, css } from "@emotion/core";

const Navbar = () => {
  return (
    <>
      <Global
        styles={css`
          .navbar {
            background-color: #2f2626;
            background: white;
            width: 100%;
            -webkit-box-shadow: 4px -17px 37px 2px rgba(0, 0, 0, 0.48);
            -moz-box-shadow: 4px -17px 37px 2px rgba(0, 0, 0, 0.48);
            box-shadow: 4px -17px 37px 2px rgba(0, 0, 0, 0.48);
          }
          .nav {
            display: flex;
            align-items: center;
            width: 90%;
            margin: auto;
            padding: 1rem 0;
          }
          .logo h1{
             color: orange;
             margin: 0;
             cursor: pointer;
          }
          .logo h4{
            text-align:center;
            color: black;
            opacity:0.5;
            margin: 0;
            cursor: pointer;
         }
          .links {
            
            margin-left: auto;
           
            align-items: center;
            justify-content: space-between;
          }
          .links p {
              cursor: pointer;
              font-size: 1.1rem;
              margin-left: 25px;
              
          }
          .social{
            display:flex;
            justify-content: center;
          }
          .nav-link{
            display:flex;
          }
        `}
      />
      <div className="navbar">
        <div className="nav">
          <div className="logo">
            <h1>Jansatta Dal</h1>
            <h4>Loktantrik</h4>
          </div>
         
          <div className="links">
            <div className="social">
              <p>mail</p>
              <p>twitter </p>
              <p>insta</p>
            </div>
            <div>
            <div className="nav-link">
                  <p>Home</p>
                  <p>About Us</p>
                  <p>Contact Us</p>
                  <p>Log In</p>
                  <p>Register</p>
            </div>  
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
