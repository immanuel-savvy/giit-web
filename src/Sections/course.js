import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";

class Featured_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  padd_length = 156;

  render() {
    let { progress } = this.state;
    let { course } = this.props;
    let { image, title, short_desc, tags, currency, cost, _id, instructor } =
      course;

    if (short_desc) {
      short_desc = short_desc.split("");
      for (let i = short_desc.length; i < this.padd_length; i++)
        short_desc.push("**");
    }

    return (
      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
        <div className="crs_grid">
          <div className="crs_grid_thumb">
            <Link to={`/course?course=${_id}`} className="crs_detail_link">
              <img src={image} className="img-fluid rounded" alt="" />
            </Link>
            <div className="crs_video_ico">
              <i className="fa fa-play"></i>
            </div>
            <div className="crs_locked_ico">
              <i className="fa fa-lock"></i>
            </div>
          </div>
          <div className="crs_grid_caption">
            <div className="crs_tutor_thumb overl_top">
              <Link to={`/instructor?instructor=${instructor?._id}`}>
                <img
                  src={instructor?.image}
                  className="img-fluid circle"
                  alt=""
                />
              </Link>
            </div>
            <div className="crs_cates cl_1">
              <span>{to_title(tags[0])}</span>
            </div>
            <div className="crs_title">
              <h4>
                <Link to={`/course?course=${_id}`} className="crs_title_link">
                  {to_title(title)}
                </Link>
              </h4>
            </div>
            <div className="crs_info_detail">
              {short_desc ? (
                <div style={{ flexWrap: "wrap", display: "flex" }}>
                  {short_desc.map((d) =>
                    d === "**" || d === " " ? <span>&nbsp;</span> : d
                  )}
                </div>
              ) : null}
            </div>
            <div className="preview_crs_info">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "50%" }}
                  aria-valuenow={progress || 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
          <div className="crs_grid_foot">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_price">
                  <h2>
                    <span className="currency">{currency || "N"}</span>
                    <span className="theme-cl">{cost}</span>
                  </h2>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_linkview">
                  <Link
                    to={`/course?course=${_id}`}
                    className="btn btn_view_detail theme-bg text-light"
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
