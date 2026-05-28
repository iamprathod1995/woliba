import React from "react";
import { Link } from "react-router-dom";
import "./LoginLayout.css";
import Dropdown from "../../common/Dropdown/Dropdown";
import { Logo } from "../../../utils/image-constannts";

const LoginLayout = ({ children }) => {
  return (
    <div className="woliba_body">
      
      {/* Header */}
      <div className="woliba_header">
        
        <div className="woliba_logo">
          <Link to="/" aria-label="Woliba Home">
            <img
              src={Logo}
              alt="Woliba Logo"
              style={{ width: "146px" }}
            />
          </Link>
        </div>

        <div className="woliba_dropdown">
          <Dropdown />
        </div>
      </div>

      {/* Content */}
      <div className="woliba_content">
        {children}
      </div>

      {/* Footer */}
      <div className="woliba_footer">
        <ul className="woliba_link">
          
          <li>
            <Link to="">
              Terms of Use
            </Link>
          </li>

          <li>
            <Link to="">
              Contact Us
            </Link>
          </li>

        </ul>

        
      </div>

    </div>
  );
};

export default LoginLayout;