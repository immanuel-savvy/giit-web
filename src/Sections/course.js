import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";

class Featured_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { progress } = this.state;
    let { course } = this.props;
    let {
      image,
      title,
      tags,
      currency,
      cost,
      _id,
      instructor,
      videos,
      enrollments_string,
      views_string,
    } = course;

    return (
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
        <div class="crs_grid">
          <div class="crs_grid_thumb">
            <Link to={`/course-detail?course=${_id}`} class="crs_detail_link">
              <img
                src={image || "https://via.placeholder.com/1200x800"}
                class="img-fluid rounded"
                alt=""
              />
            </Link>
            <div class="crs_video_ico">
              <i class="fa fa-play"></i>
            </div>
            <div class="crs_locked_ico">
              <i class="fa fa-lock"></i>
            </div>
          </div>
          <div class="crs_grid_caption">
            <div class="crs_tutor_thumb overl_top">
              <Link to={`/instructor-detail?instructor=${instructor?._id}`}>
                <img
                  src={
                    instructor?.image || "https://via.placeholder.com/500x500"
                  }
                  class="img-fluid circle"
                  alt=""
                />
              </Link>
            </div>
            <div class="crs_cates cl_1">
              <span>{to_title(tags[0])}</span>
            </div>
            <div class="crs_title">
              <h4>
                <Link
                  to={`/course-detail?course=${_id}`}
                  class="crs_title_link"
                >
                  {to_title(title)}
                </Link>
              </h4>
            </div>
            <div class="crs_info_detail">
              <ul>
                <li>
                  <i class="fa fa-video"></i>
                  <span>{`${videos} Videos`}</span>
                </li>
                <li>
                  <i class="fa fa-user"></i>
                  <span>{`${enrollments_string} User`}</span>
                </li>
                <li>
                  <i class="fa fa-eye"></i>
                  <span>{`${views_string} Views`}</span>
                </li>
              </ul>
            </div>
            <div class="preview_crs_info">
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={{ width: "50%" }}
                  aria-valuenow={progress || 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
          <div class="crs_grid_foot">
            <div class="crs_flex">
              <div class="crs_fl_first">
                <div class="crs_price">
                  <h2>
                    <span class="currency">{currency || "N"}</span>
                    <span class="theme-cl">{cost}</span>
                  </h2>
                </div>
              </div>
              <div class="crs_fl_last">
                <div class="crs_linkview">
                  <Link
                    to={`/course-detail?course=${_id}`}
                    class="btn btn_view_detail theme-bg text-light"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Featured_course;
