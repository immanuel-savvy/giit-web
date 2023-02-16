import React from "react";
import { Link } from "react-router-dom";
import {
  commalise_figures,
  gen_random_int,
  to_title,
} from "../Assets/js/utils/functions";
import Video from "../Components/video";
import { domain, SKILL_LEVEL } from "../Constants/constants";
import { Flash_promo } from "../Contexts";
import { emitter } from "../Giit";
import { pricey } from "./course";

class Course_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_short_description = () =>
    this.setState({ show_full: !this.state.show_full });

  handle_enroll = (e) => {
    let { course } = this.props;
    window.sessionStorage.setItem("enroll", JSON.stringify(course));
    emitter.emit("push_enroll", course);
  };

  render() {
    let { show_full } = this.state;
    let { course, cummulative_price } = this.props;
    let {
      image,
      video,
      enrollments,
      duration,
      lectures,
      skill_level,
      price,
      short_description,
    } = course;
    price = price || cummulative_price || 0;

    return (
      <Flash_promo.Consumer>
        {({ flash_promo }) => {
          return (
            <div className="col-lg-4 col-md-12 order-lg-last">
              <div className="ed_view_box style_3 ovrlio stick_top">
                <Video
                  thumbnail_class="pro_img img-fluid w100"
                  thumbnail={`${domain}/Images/${image}`}
                  url={video}
                />

                <div className="d-flex">
                  <div className="ed_view_price pl-4">
                    <span>Actual Price</span>
                    {flash_promo ? (
                      <em
                        style={{ textDecoration: "line-through" }}
                        className="theme-cl h4"
                      >
                        <br />
                        &#8358; {commalise_figures(Number(price))}
                      </em>
                    ) : (
                      <h2 className="theme-cl">
                        &#8358; {commalise_figures(Number(price))}
                      </h2>
                    )}
                  </div>

                  {flash_promo ? (
                    <div className="ed_view_price pl-4">
                      <span>Promo Price</span>
                      <h2 className="theme-cl">
                        &#8358;{" "}
                        {Number(pricey(price, flash_promo.percentage_off))}
                      </h2>
                    </div>
                  ) : null}
                </div>
                <div
                  onClick={this.toggle_short_description}
                  className="ed_view_short pl-4 pr-4 pb-2"
                >
                  <p>
                    {show_full
                      ? short_description
                      : `${short_description.slice(0, 150)}...`}
                  </p>
                </div>

                <div class="ed_view_features half_list pl-4 pr-3">
                  <span>Course Features</span>
                  <ul>
                    <li>
                      <i class="fa fa-gem"></i>
                      {`${enrollments || 0} Enrollments`}
                    </li>
                    <li>
                      <i class="ti-time"></i>
                      {`${duration || 12} Weeks`}
                    </li>
                    <li>
                      <i class="fa fa-users"></i>
                      {`${lectures || 13} Lectures`}
                    </li>
                    <li>
                      <i class="ti-bar-chart-alt"></i>
                      {to_title(
                        `${
                          skill_level ||
                          SKILL_LEVEL[gen_random_int(SKILL_LEVEL.length)]
                        }`
                      )}
                    </li>
                  </ul>
                </div>

                <div className="ed_view_link">
                  <Link to="/enroll" style={{ textDecorationLine: "none" }}>
                    <span
                      onClick={this.handle_enroll}
                      className="btn theme-bg enroll-btn"
                    >
                      Enroll Now<i className="ti-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        }}
      </Flash_promo.Consumer>
    );
  }
}

export default Course_sidebar;
