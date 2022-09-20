import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import alan from "./../Assets/video/alan.mp4";
import logo from "./../Assets/img/thumbnail.jpg";
import Video from "../Components/video";

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
          backgroundImage: "url(./../Assets/img/bannerbg.png)",
          backgroundRepeat: "no-repeat",
        }}
        data-overlay="5"
      >
        <Container>
          <Row className="align-items-center">
            <Col xl={6} lg={6} md={6} sm={12}>
              <div className="mb-3 simple-search-wrap text-left">
                <div className="hero_search-2">
                  <div className="elsio_tag">RAISING GLOBALSTARS</div>
                  <h1 className="banner_title mb-4">
                    Enjoy 100% practical sessions
                  </h1>
                  <p className="font-lg mb-4">
                    Every professional starts out as a beginner. At our hands-on
                    class sessions, join other Global leaders.
                  </p>
                  <div className="input-group simple_search">
                    <div className="input-group-append">
                      <button
                        className="btn theme-bg rounded text-light"
                        type="button"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Video url={alan} thumbnail={logo} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
