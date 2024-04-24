import React from "react";
import { Link } from "react-router-dom";
import {
  commalise_figures,
  gen_random_int,
  to_title,
} from "../Assets/js/utils/functions";
import Video from "../Components/video";
import { domain, ELEARN, SKILL_LEVEL } from "../Constants/constants";
import { Flash_promo } from "../Contexts";
import { emitter } from "../Giit";
import { pricey } from "./course";
import Instructor from "./instructor";
import Stretch_button from "../Components/stretch_button";

class Course_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {};

  toggle_short_description = () =>
    this.setState({ show_full: !this.state.show_full });

  handle_enroll = (e) => {
    let { course } = this.props;
    window.sessionStorage.setItem("enroll", JSON.stringify(course));
    emitter.emit("push_enroll", course);
  };

  render() {
    let { show_full } = this.state;
    let { course, cummulative_price, class_name, is_enrolled } = this.props;
    let {
      image,
      video,
      enrollments,
      duration,
      lectures,
      skill_level,
      online_price,
      price,
      instructor,
      short_description,
    } = course;
    price = price || cummulative_price || 0;

    return (
      <Flash_promo.Consumer>
        {({ flash_promo }) => {
          return (
            <div
              className={
                class_name
                  ? `${class_name} order-lg-last`
                  : "col-lg-4 col-md-12 order-lg-last"
              }
            >
              <div className="ed_view_box style_2 stick_top">
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
                        &#8358;{" "}
                        {commalise_figures(
                          Number(ELEARN ? online_price || price : price)
                        )}
                      </em>
                    ) : (
                      <h2 className="theme-cl">
                        &#8358;{" "}
                        {commalise_figures(
                          Number(ELEARN ? online_price || price : price)
                        )}
                      </h2>
                    )}
                  </div>

                  {flash_promo ? (
                    <div className="ed_view_price pl-4">
                      <span>Promo Price</span>
                      <h2 className="theme-cl">
                        &#8358;{" "}
                        {pricey(
                          ELEARN ? online_price || price : price,
                          flash_promo.percentage_off
                        )}
                      </h2>
                    </div>
                  ) : null}
                </div>
                <div
                  onClick={this.toggle_short_description}
                  className="ed_view_short pl-4 pr-4 pb-2"
                >
                  <p style={{ fontSize: 18 }}>
                    {show_full
                      ? short_description
                      : `${short_description.slice(0, 150)}...`}
                  </p>
                </div>

                <div class="ed_view_features half_list pl-4 pr-3">
                  <span style={{ fontSize: 20 }}>Course Features</span>
                  <ul style={{ fontSize: 18 }}>
                    <li>
                      <i class="fa fa-gem"></i>
                      {`${
                        Number(enrollments) > 25
                          ? enrollments
                          : gen_random_int(600, 120)
                      } Enrollments`}
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
                  {is_enrolled ? (
                    <>
                      <a
                        href={`${domain}/Files/${course.curriculum_file}`}
                        target="_blank"
                        style={{ visibility: "hidden" }}
                        className={`curr_${course._id.replace(/~/g, "00")}`}
                      ></a>
                      <Stretch_button
                        title="Download Curriculum"
                        action={() =>
                          document
                            .querySelector(
                              `.curr_${course._id.replace(/~/g, "00")}`
                            )
                            .click()
                        }
                      />
                    </>
                  ) : (
                    <Link to="/enroll" style={{ textDecorationLine: "none" }}>
                      <span
                        onClick={this.handle_enroll}
                        className="btn theme-bg enroll-btn"
                      >
                        Enroll Now<i className="ti-angle-right"></i>
                      </span>
                    </Link>
                  )}
                </div>
                <div className="ed_view_link">
                  <Link to="/contact_us" style={{ textDecorationLine: "none" }}>
                    <span
                      onClick={this.handle_enroll}
                      className="btn theme-light enroll-btn"
                    >
                      Contact Us<i className="fas fa-phone-alt"></i>
                    </span>
                  </Link>
                </div>

                {ELEARN ? <Instructor instructor={instructor} full /> : null}
              </div>
            </div>
          );
        }}
      </Flash_promo.Consumer>
    );
  }
}

export default Course_sidebar;
