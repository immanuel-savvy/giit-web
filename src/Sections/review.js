import React from "react";
import { to_title } from "../Assets/js/utils/functions";
import { domain } from "../Constants/constants";

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_full_text = () => this.setState({ full_text: !this.state.full_text });

  render() {
    let { review, remove } = this.props;
    let { full_text } = this.state;
    let { image, name, organisation, position, rating, text } = review;
    text = text[0].toUpperCase() + text.slice(1);

    return (
      <div
        className={
          remove
            ? "col-md-6 col-lg-4 col-sm-12 mb-3"
            : "single_items lios_item mb-3"
        }
      >
        <div className="_testimonial_wrios shadow_none">
          <div className="_testimonial_flex">
            <div className="_testimonial_flex_first">
              <div className="_tsl_flex_thumb">
                <img
                  src={`${domain}/Images/${image}`}
                  style={{
                    height: "70px",
                    width: "70px",
                    borderRadius: "35px",
                  }}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="_tsl_flex_capst">
                <h5>{name}</h5>
                <div className="_ovr_posts">
                  <span>{to_title(`${position}, ${organisation}`)}</span>
                </div>
                <div className="_ovr_rates">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  {`${rating || 1.0}`}
                </div>
              </div>
            </div>
            {remove ? (
              <a
                onClick={() => window.confirm("Remove review?") && remove()}
                className="btn btn-action"
              >
                <i className={`fas fa-window-close`}></i>
              </a>
            ) : null}
          </div>
          <div className="facts-detail">
            <a onClick={this.toggle_full_text} style={{ cursor: "pointer" }}>
              <p>{full_text ? text : text.slice(0, 150)}</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
