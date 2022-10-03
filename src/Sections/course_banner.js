import React from "react";
import { to_title } from "../Assets/js/utils/functions";
import { domain } from "../Constants/constants";

class Course_banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { course } = this.props;
    let { image, tags, title, stars, reviews, short_description } = course;

    return (
      <div
        class="ed_detail_head bg-cover"
        style={{
          backgroundColor: "#03b97c",
          backgroundImage: `url(${domain}/Images/${image})`,
          backgroundRepeat: "no-repeat",
        }}
        data-overlay="8"
      >
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7 col-md-7">
              <div class="ed_detail_wrap light">
                {tags && tags.length
                  ? tags.map((tag) => (
                      <div class="crs_cates cl_1">
                        <span>{tag}</span>
                      </div>
                    ))
                  : null}
                <div class="ed_header_caption">
                  <h2 class="ed_title">{to_title(title)}</h2>
                </div>
                <div class="ed_header_short">
                  <p>{short_description}</p>
                </div>

                <div class="ed_rate_info">
                  <div class="star_info">
                    <i class={`fas fa-star ${stars >= 0 ? "filled" : ""}`}></i>
                    <i class={`fas fa-star ${stars >= 1 ? "filled" : ""}`}></i>
                    <i class={`fas fa-star ${stars >= 2 ? "filled" : ""}`}></i>
                    <i class={`fas fa-star ${stars >= 3 ? "filled" : ""}`}></i>
                    <i class={`fas fa-star ${stars >= 4 ? "filled" : ""}`}></i>
                  </div>
                  <div class="review_counter">
                    <strong class="high">{stars || 0}</strong>
                    &nbsp;&nbsp;
                    {reviews ? ` ${reviews} Reviews` : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Course_banner;
