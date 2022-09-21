import React from "react";
import { Col } from "react-bootstrap";
import Video from "../Components/video";
import alan from "./../Assets/video/alan.mp4";
import logo from "./../Assets/img/thumbnail.jpg";
import Review from "./review";

class Student_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    // fetch reviews
    let reviews = new Array({
      student: {
        image: "../Assets/img/learning_procedure.jpg",
        name: "lola grey",
        job: { organisation: "UNIZIK", position: "Student" },
      },
      rating: 4.7,
      text: "Deserunt irure et duis qui voluptate duis proident. Amet culpa eiusmod dolor ipsum proident in ullamco mollit.",
    }); // await fetch('')

    this.setState({ reviews });
  };

  render() {
    let { gray } = this.props;
    let { reviews } = this.state;

    return (
      <section className={`gray`}>
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-6 col-md-6 col-sm-12 align-items-center d-flex">
              <div className="">
                <h2>
                  Our Students <span className="theme-cl">Reviews</span>
                </h2>
                <p class="h5">
                  Here's is what some of our happy alumni has to say
                </p>
              </div>
            </div>
            <Col lg={6} md={6} sm={12} className="align-items-center">
              <Video url={alan} thumbnail={logo} />
            </Col>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-sm-12">
              <div className="reviews-slide space">
                {reviews && reviews.length
                  ? new Array(1, 2, 3, 4, 5, 6, 7).map((review, index) => (
                      <Review review={reviews[0]} key={index} />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Student_reviews;
