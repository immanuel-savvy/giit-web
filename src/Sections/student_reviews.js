import React from "react";
import { Col } from "react-bootstrap";
import Video from "../Components/video";
import alan from "./../Assets/video/alan.mp4";
import logo from "./../Assets/img/thumbnail.jpg";
import Review from "./review";
import Loadindicator from "../Components/loadindicator";

class Student_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {};

  render() {
    let { reviews } = this.state;

    if (reviews && !reviews.length) return null;

    return (
      <section className={`gray`}>
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-6 col-md-6 col-sm-12 align-items-center d-flex">
              <div className="">
                <h2>
                  Our Students <span className="theme-cl">Reviews</span>
                </h2>
                <p className="h5">
                  Here is what some of our happy alumni has to say
                </p>
              </div>
            </div>
            <Col lg={6} md={6} sm={12} className="align-items-center">
              <Video url={alan} thumbnail={logo} />
            </Col>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-sm-12">
              {reviews ? (
                <div className="reviews-slide space">
                  {reviews.map((review, index) => (
                    <Review review={review} key={index} />
                  ))}
                </div>
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Student_reviews;
