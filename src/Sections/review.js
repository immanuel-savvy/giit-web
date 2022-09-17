import React from "react";

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { review } = this.props;
    let { student, rating, text } = review;

    return (
      <div className="single_items lios_item">
        <div className="_testimonial_wrios shadow_none">
          <div className="_testimonial_flex">
            <div className="_testimonial_flex_first">
              <div className="_tsl_flex_thumb">
                <img
                  src={student.image || "https://via.placeholder.com/500x500"}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="_tsl_flex_capst">
                <h5>{student.name}</h5>
                <div className="_ovr_posts">
                  <span>{`${student.job.position}, ${student.job.organisation}`}</span>
                </div>
                <div className="_ovr_rates">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  {`${rating}`}
                </div>
              </div>
            </div>
            <div className="_testimonial_flex_first_last">
              <div className="_tsl_flex_thumb">
                <img
                  src="https://via.placeholder.com/300x300"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="facts-detail">
            <p>{text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
