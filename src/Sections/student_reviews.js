import React from "react";
import { Col } from "react-bootstrap";
import Video from "../Components/video";
import alan from "./../Assets/video/alan.mp4";
import logo from "./../Assets/img/thumbnail.jpg";
import Review from "./review";
import Loadindicator from "../Components/loadindicator";
import { get_request } from "../Assets/js/utils/services";
import Add_student_review from "./add_student_review";
import { emitter } from "../Giit";

class Student_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let reviews = await get_request("reviews");
    this.setState({ reviews });

    this.new_alumni_review = (review) => {
      let { reviews } = this.state;
      reviews = new Array(...reviews, review);

      this.setState({ reviews });
    };

    emitter.listen("new_alumni_review", this.new_alumni_review);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_alumni_review", this.new_alumni_review);
  };

  toggle_add_review = () =>
    this.setState({ add_review: !this.state.add_review });

  render() {
    let { reviews, add_review } = this.state;

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
                <br />
                {/* <div>
                  <div className="elkios" onClick={this.toggle_add_review}>
                    <a
                      href="#"
                      className="btn theme-bg text-white"
                      data-toggle="modal"
                      data-target="#catModal"
                    >
                      <i className="fas fa-plus-circle mr-1"></i>Add a review
                    </a>
                  </div>
                </div> */}
                <br />
              </div>
            </div>
            <Col lg={6} md={6} sm={12} className="align-items-center">
              <Video url={alan} thumbnail={logo} />
            </Col>
          </div>
          {add_review ? (
            <Add_student_review toggle={this.toggle_add_review} />
          ) : null}
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-sm-12">
              {reviews ? (
                reviews && !reviews.length ? null : (
                  <div className="reviews-slide space">
                    {reviews.map((review, index) => (
                      <Review review={review} key={index} />
                    ))}
                  </div>
                )
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
