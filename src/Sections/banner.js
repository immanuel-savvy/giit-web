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
        className="hero_banner image-cover image_bottom"
        style={{
          backgroundImage: `url("http://localhost:3000/Assets/img/banner-1.png")`,
          backgroundColor: "#f7f8f9",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-md-10 col-sm-12">
              <div className="simple-search-wrap">
                <div className="hero_search-2 text-center">
                  <div className="elsio_tag">LISTEN TO OUR NEW ANTHEM</div>
                  <h1 className="banner_title mb-4">
                    Crack UPSC CSE - GS with World's largest learning platform
                  </h1>
                  <p className="font-lg mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
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
