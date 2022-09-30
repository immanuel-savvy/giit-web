import React from "react";
import Video from "../Components/video";
import { domain } from "../Constants/constants";

class Course_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_short_description = () =>
    this.setState({ show_full: !this.state.show_full });

  render() {
    let { show_full } = this.state;
    let { course } = this.props;
    let { image, video, price, short_description } = course;

    return (
      <div class="col-lg-4 col-md-12  order-lg-last">
        <div class="ed_view_box style_3 ovrlio stick_top">
          <Video
            thumbnail_class="pro_img img-fluid w100"
            thumbnail={`${domain}/Images/${image}`}
            url={video}
          />

          <div class="ed_view_price pl-4">
            <span>Actual Price</span>
            <h2 class="theme-cl">&#8358; {price.toFixed(2)}</h2>
          </div>

          <div
            onClick={this.toggle_short_description}
            class="ed_view_short pl-4 pr-4 pb-2"
          >
            <p>
              {show_full ? short_description : short_description.slice(0, 150)}
            </p>
          </div>

          {/* <div class="ed_view_features half_list pl-4 pr-3">
            <span>Course Features</span>
            <ul>
              <li>
                <i class="ti-user"></i>3k Students View
              </li>
              <li>
                <i class="ti-time"></i>2 hour 30 min
              </li>
              <li>
                <i class="ti-bar-chart-alt"></i>Principiante
              </li>
              <li>
                <i class="ti-cup"></i>04 Certified
              </li>
            </ul>
          </div> */}
          <div class="ed_view_link">
            <a href="#" class="btn theme-bg enroll-btn">
              Enroll Now<i class="ti-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Course_sidebar;
