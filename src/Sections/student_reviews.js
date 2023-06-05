import React from "react";
import { Col } from "react-bootstrap";
import Video from "../Components/video";
import Review from "./review";
import Loadindicator from "../Components/loadindicator";
import { domain, get_request, post_request } from "../Assets/js/utils/services";
import Add_student_review from "./add_student_review";
import { emitter } from "../Giit";
import Explore_more_btn from "./explore_more_btn";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

class Student_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let alumni_overview = await get_request("alumni_overview");
    this.setState({ alumni_overview });

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
    let { reviews, add_review, alumni_overview } = this.state;

    if (!alumni_overview && reviews && !reviews.length) return;

    return (
      <section className={no_gray ? "" : `gray`}>
        <div className="container">
          <div className="row mb-3">
            <div
              className={`col-lg-${alumni_overview ? "6" : "12"} col-md-${
                alumni_overview ? "6" : "12"
              } ${
                alumni_overview ? "" : "justify-content-center"
              } col-sm-12 align-items-center d-flex`}
            >
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
            {alumni_overview ? (
              <Col lg={6} md={6} sm={12} className="align-items-center">
                <Video
                  url={`${domain}/Videos/${alumni_overview.video}`}
                  thumbnail={alumni_overview.thumbnail}
                />
              </Col>
            ) : null}
          </div>
          {add_review ? (
            <Add_student_review toggle={this.toggle_add_review} />
          ) : null}
          <div className="row justify-content-center">
            {reviews ? (
              reviews && !reviews.length ? null : (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  pagination={{ clickable: true }}
                  slidesPerView={window.innerWidth < 650 ? 1 : 3}
                  autoplay={{
                    delay: 2000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }}
                  loop
                  // className="swiper-container"
                >
                  {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                      <Review review={review} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )
            ) : (
              <Loadindicator contained />
            )}
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
