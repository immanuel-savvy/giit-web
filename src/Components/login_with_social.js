import React from "react";
import { Link } from "react-router-dom";

class Login_with_social extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <span>
        <div className="rcs_log_125">
          <span>Or Login with Social Info</span>
        </div>
        <div className="rcs_log_126">
          <ul className="social_log_45 row">
            <li className="col-xl-4 col-lg-4 col-md-4 col-4">
              <Link to="javascript:void(0);" className="sl_btn">
                <i className="ti-facebook text-info"></i>
                Facebook
              </Link>
            </li>
            <li className="col-xl-4 col-lg-4 col-md-4 col-4">
              <Link to="javascript:void(0);" className="sl_btn">
                <i className="ti-google text-danger"></i>
                Google
              </Link>
            </li>
            <li className="col-xl-4 col-lg-4 col-md-4 col-4">
              <Link to="javascript:void(0);" className="sl_btn">
                <i className="ti-twitter theme-cl"></i>
                Twitter
              </Link>
            </li>
          </ul>
        </div>
      </span>
    );
  }
}

export default Login_with_social;
