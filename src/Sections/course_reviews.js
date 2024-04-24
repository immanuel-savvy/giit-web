import React from "react";
import { generate_random_string } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";
import Course_review from "./course_review";
import Course_review_rating from "./course_review_rating";
import Review_form from "./review_form";

class Course_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { course } = this.props;

    let stored_node_id = window.localStorage.getItem("node_pager");

    let node_id = stored_node_id || generate_random_string(15, "alnum");
    if (!stored_node_id) window.localStorage.setItem("node_pager", node_id);

    let reviews = await post_request("course_reviews", {
      course: course._id,
      limit: 10,
      pager: node_id,
      reset_pager: true,
    });

    this.setState({ reviews });

    this.new_course_review = (review) => {
      if (review.course !== course._id) return;
      let { reviews } = this.state;

      reviews = new Array(...reviews, review);
      this.setState({ reviews });
    };

    emitter.listen("new_course_review", this.new_course_review);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_course_review", this.new_course_review);
  };

  post_review = async (review) => {
    review.course = this.props.course._id;

    let response = await post_request("post_review", { review });
    if (response && response._id) {
      let { reviews } = this.state;
      reviews = new Array(...reviews, response);
      this.setState({ reviews });
    }
  };

  tabname = "reviews";

  render() {
    let { reviews } = this.state;
    let { active_tab, course } = this.props;

    return (
      <div
        className={`tab-pane fade ${
          active_tab === this.tabname ? " show active" : ""
        }`}
        id="reviews"
        role="tabpanel"
        aria-labelledby="reviews-tab"
      >
        {/* <Course_review_rating course={course} /> */}
        <div className="list-single-main-item fl-wrap">
          <div className="list-single-main-item-title fl-wrap">
            {reviews && reviews.length ? (
              <h3>
                Course Reviews (<span> {reviews.length} </span>)
              </h3>
            ) : (
              <h3>No reviews yet.</h3>
            )}
          </div>
          <div className="reviews-comments-wrap">
            {reviews ? (
              reviews.length ? (
                reviews.map((review) => (
                  <Course_review review={review} key={review._id} />
                ))
              ) : null
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>
        <Review_form post_review={this.post_review} />
      </div>
    );
  }
}

export default Course_reviews;
