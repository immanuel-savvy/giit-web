import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import Review from "../review";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let reviews = await get_request("reviews");

    this.setState({ reviews });
  };

  remove_review = async (review_id) => {
    let { reviews } = this.state;

    reviews = reviews.filter((review) => review._id !== review_id);
    this.setState({ reviews });

    await post_request(`remove_review/${review_id}`);
  };

  render() {
    let { reviews } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage reviews" />

        <div className="row">
          {reviews ? (
            reviews.length ? (
              reviews.map((review) => (
                <Review
                  review={review}
                  remove={() => this.remove_review(review._id)}
                />
              ))
            ) : (
              <div className="my-5 d-flex justify-content-center">
                <p className="h4">No Reviews yet.</p>
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_reviews;
