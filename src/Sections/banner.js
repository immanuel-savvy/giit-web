import React from "react";
import { Link } from "react-router-dom";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        className="hero_banner image-cover"
        style={{
          backgroundColor: "#03b97c",
          backgroundImage:
            "url(http://localhost:3000/Assets/img/banner_001.jpg)",
          backgroundRepeat: "no-repeat",
        }}
        data-overlay="5"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-7 col-md-8 col-sm-12">
              <div className="simple-search-wrap text-left">
                <div className="hero_search-2">
                  <div className="elsio_tag">RAISING GLOBALSTARS</div>
                  <h1 className="banner_title mb-4">
                    Find the most exciting cources online
                  </h1>
                  <p className="font-lg mb-4">
                    Become certified and get high paying local and international
                    jobs
                  </p>
                  <div className="input-group simple_search">
                    <i className="fa fa-search ico"></i>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Your Cources"
                    />
                    <div className="input-group-append">
                      <button className="btn theme-bg" type="button">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
