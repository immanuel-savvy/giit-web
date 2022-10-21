import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import alan from "./../Assets/video/alan.mp4";
import logo from "./../Assets/img/thumbnail.jpg";
import Video from "../Components/video";
import { Link } from "react-router-dom";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        className="hero_banner d-flex justify-content-center image-cover for_top_info"
        style={{
          backgroundColor: "gray",
          backgroundImage: "url(./../Assets/img/web_banner_giit_africa_02.png)",
          backgroundRepeat: "no-repeat",
          marginTop: "50px",
          // height: "60%",
        }}
        data-overlay="1"
      >
        <Container style={{ height: 300 }}>
          <Row className="align-items-center mb-2">
            <Col xl={6} lg={6} md={6} sm={12}>
              <div
                className="simple-search-wrap text-left"
                style={{
                  linearGradient: "reform",
                  paddingHorizontal: "50px",
                  borderRadius: "25px",
                }}
              >
                <div className="hero_search-2">
                  <div className="elsio_tag">RAISING GLOBALSTARS</div>
                  <h1 className="banner_title mb-2">
                    Enjoy 100% practical sessions
                  </h1>
                  <p className="font-lg mb-4">
                    Every professional starts out as a beginner. At our hands-on
                    class sessions, join other Global leaders.
                  </p>
                  <div className="input-group simple_search">
                    <div className="input-group-append">
                      <Link to="/courses">
                        <span
                          className="btn pt-3 theme-bg ml-0 rounded text-light"
                          type="button"
                        >
                          Apply Now
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col style={{ display: "none" }} xl={6} lg={6} md={6} sm={12}>
              <Video url={alan} thumbnail={logo} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
