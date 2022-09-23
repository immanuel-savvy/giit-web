import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="main-wrapper">
        <Header page="signup" />
        <div className="clearfix"></div>
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                <form>
                  <div className="crs_log_wrap">
                    <div className="crs_log__thumb">
                      <img
                        src="../Assets/img/loginbg4.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="crs_log__caption">
                      <div className="rcs_log_123">
                        <div className="rcs_ico">
                          <i className="fas fa-lock"></i>
                        </div>
                      </div>

                      <div className="rcs_log_124">
                        <div className="Lpo09">
                          <h4>Login Your Account</h4>
                        </div>
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="you@mail.com"
                          />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="*******"
                          />
                        </div>
                        <div className="form-group">
                          <button
                            type="button"
                            className="btn full-width btn-md theme-bg text-white"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                      <div className="rcs_log_125">
                        <span>Or Login with Social Info</span>
                      </div>
                      <div className="rcs_log_126">
                        <ul className="social_log_45 row">
                          <li className="col-xl-4 col-lg-4 col-md-4 col-4">
                            <Link to="javascript:void(0);" className="sl_btn">
                              <i className="ti-facebook text-info"></i>Facebook
                            </Link>
                          </li>
                          <li className="col-xl-4 col-lg-4 col-md-4 col-4">
                            <Link to="javascript:void(0);" className="sl_btn">
                              <i className="ti-google text-danger"></i>Google
                            </Link>
                          </li>
                          <li className="col-xl-4 col-lg-4 col-md-4 col-4">
                            <Link to="javascript:void(0);" className="sl_btn">
                              <i className="ti-twitter theme-cl"></i>Twitter
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="crs_log__footer d-flex justify-content-between">
                      <div className="fhg_45">
                        <p className="musrt">
                          Don't have account?{" "}
                          <Link to="/signup" className="theme-cl">
                            SignUp
                          </Link>
                        </p>
                      </div>
                      <div className="fhg_45">
                        <p className="musrt">
                          <Link to="/forgot_password" className="text-danger">
                            Forgot Password?
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Login;
