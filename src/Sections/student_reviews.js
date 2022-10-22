import React from "react";
import { Col } from "react-bootstrap";
import Video from "../Components/video";
import alan from "./../Assets/video/alan.mp4";
import logo from "./../Assets/img/thumbnail.jpg";
import Review from "./review";
import Loadindicator from "../Components/loadindicator";
import { get_request, post_request } from "../Assets/js/utils/services";
import Add_student_review from "./add_student_review";
import { emitter } from "../Giit";
import Explore_more_btn from "./explore_more_btn";

class Student_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let reviews = await post_request("reviews", { verified: true, limit: 12 });
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
    let { no_gray } = this.props;
    let { reviews, add_review } = this.state;

    return (
      <section className={no_gray ? "" : `gray`}>
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-6 col-md-6 col-sm-12 align-items-center d-flex">
              <div className="">
                <h2>
                  Our <span className="theme-cl">Testimonials</span>
                </h2>
                <p className="h5">
                  Here is what some of our happy alumni has to say
                </p>
                <br />
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
          {reviews && reviews.length ? (
            <Explore_more_btn title="Testimonies" to={"/testimonials"} />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Student_reviews;
