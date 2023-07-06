import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer, { scroll_to_top } from "../Sections/footer";
import Header from "../Sections/header";
import { post_request } from "../Assets/js/utils/services";
import Review from "../Sections/review";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import Add_student_review from "../Sections/dashboard/add_review_form";
import { organisation_name } from "../Constants/constants";
import Video_review from "../Components/video_review";

class Testimonials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      page_size: 24,
    };
  }

  componentDidMount = async () => {
    scroll_to_top();
    document.title = `Testimonials | ${organisation_name}`;

    let { page_size, page } = this.state;

    let reviews = await post_request("reviews", {
      verified: true,
      skip: page_size * page,
      limit: page_size,
    });

    this.setState({ reviews });

    let video_reviews = await post_request("video_reviews");
    this.setState({ video_reviews });
  };

  toggle_form = () => this.setState({ show_form: !this.state.show_form });

  render() {
    let { reviews, show_form, video_reviews, review_submitted } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="Testimonials" refs="header" />
        <div className="clearfix"></div>
        <Breadcrumb
          page_title="What we did?"
          no_gray
          page_text="Testimonials"
        />

        <div style={{ backgroundColor: "#f7f8f9", paddingTop: 20 }}>
          <div className="container">
            <div class="row justify-content-center my-3">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    Our Video <span class="theme-cl">Reviews</span>
                  </h2>
                  <p></p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              {video_reviews ? (
                video_reviews.length ? (
                  video_reviews.map((r) => (
                    <Video_review
                      review={r}
                      class_name="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-2"
                      key={r._id}
                    />
                  ))
                ) : null
              ) : (
                <Loadindicator />
              )}
            </div>

            <div class="row justify-content-center my-3 mt-5">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    <span class="theme-cl">Reviews</span>
                  </h2>
                  <p>More on what our happy alumnis has to say</p>
                </div>
              </div>
            </div>

            <div className="mt-5 row justify-content-center">
              {reviews ? (
                reviews.length ? (
                  reviews.map((review) => (
                    <Review testimonials review={review} />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator contained />
              )}
            </div>
            <div
              className={
                "d-flex align-items-center justify-content-center py-5"
              }
            >
              {review_submitted ? (
                <span>
                  <Review review={review_submitted} />

                  <div className="alert alert-success" role="alert">
                    Thanks for sending us a review &nbsp;
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                  </div>
                </span>
              ) : (
                <span class="elkios" onClick={this.toggle_form}>
                  <a
                    href="#"
                    class="add_new_btn"
                    data-toggle="modal"
                    data-target="#catModal"
                  >
                    <i class="fas fa-plus-circle mr-1"></i>
                    Add a review
                  </a>
                </span>
              )}
            </div>
            <div className="row justify-content-center">
              {show_form ? (
                <Add_student_review
                  toggle={this.toggle_form}
                  on_submit={(review) =>
                    this.setState({ review_submitted: review })
                  }
                />
              ) : null}
            </div>
          </div>
        </div>
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Testimonials;
