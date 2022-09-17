import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <footer className="dark-footer skin-dark-footer style-2">
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5">
                <div className="footer_widget">
                  <img
                    src={`http://localhost:3000/Assets/img/logo.png`}
                    className="img-footer small mb-2"
                    alt=""
                  />
                  <h4 className="extream mb-3">
                    Do you need help with
                    <br />
                    anything?
                  </h4>
                  <p>
                    Receive updates, hot deals, tutorials, discounts sent
                    straignt in your inbox every month
                  </p>
                  <div className="foot-news-last">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="input-group-text theme-bg b-0 text-light"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12 text-center">
                <p className="mb-0">
                  © 2022 GIIT Africa. Designed By
                  <a href="https://github.com/immanuel-savvy"> Savvy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
