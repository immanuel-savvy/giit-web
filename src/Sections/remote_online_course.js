import React from "react";
import { Link } from "react-router-dom";

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { course } = this.props;
    let {
      cover,
      title,
      tags,
      enrollments,
      duration_text,
      audience,
      lectures,
      author,
      price,
    } = course;

    return (
      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
        <div className="crs_grid">
          <div className="crs_grid_thumb">
            <Link to="/course_detail" className="crs_detail_link">
              <img
                src={cover || "https://via.placeholder.com/1200x800"}
                className="img-fluid rounded"
                alt=""
              />
            </Link>
            <div className="crs_video_ico">
              <i className="fa fa-play"></i>
            </div>
            <div className="crs_locked_ico">
              <i className="fa fa-lock"></i>
            </div>
          </div>
          <div className="crs_grid_caption">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_cates cl_6">
                  <span>{tags[0]}</span>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_inrolled">
                  <strong>{enrollments}</strong>Enrolled
                </div>
              </div>
            </div>
            <div className="crs_title">
              <h4>
                <Link to="/course_detail" className="crs_title_link">
                  {title}
                </Link>
              </h4>
            </div>
            <div className="crs_info_detail">
              <ul>
                <li>
                  <i className="fa fa-clock text-danger"></i>
                  <span>{duration_text}</span>
                </li>
                <li>
                  <i className="fa fa-video text-success"></i>
                  <span>{lectures} Lectures</span>
                </li>
                <li>
                  <i className="fa fa-signal text-warning"></i>
                  <span>{audience}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="crs_grid_foot">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_tutor">
                  <div className="crs_tutor_thumb">
                    <Link to="/instructor_detail">
                      <img
                        src={author.image}
                        className="img-fluid circle"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="crs_tutor_name">
                    <Link to="instructor-detail.html">{author.name}</Link>
                  </div>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_price">
                  <h2>
                    <span className="currency">N</span>
                    <span className="theme-cl">{price}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
