import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Link } from "react-router-dom";
import { gen_random_int, to_title } from "../Assets/js/utils/functions";
import Video from "../Components/video";
import { client_domain, domain } from "../Constants/constants";
import { emitter } from "../Giit";

class Featured_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { course } = this.props;

    this.full_desc = (course_id) => {
      if (!this.state.full_desc || course_id === course._id) return;
      this.setState({ full_desc: false });
    };
    emitter.listen("full_desc", this.full_desc);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("full_desc", this.full_desc);
  };

  toggle_description = () =>
    this.setState({ full_desc: !this.state.full_desc }, () =>
      emitter.emit("full_desc", this.props.course._id)
    );

  play_video = () => this.setState({ play: !this.state.play });

  padd_length = 156;

  handle_course = () => {
    let { course } = this.props;
    window.sessionStorage.setItem("course", JSON.stringify(course));
    window.location.assign(`${client_domain}/course`);
  };

  render() {
    let { progress, full_desc, play } = this.state;
    let { course, adminstrator, edit_course, delete_course, in_courses } =
      this.props;
    let {
      image,
      categories,
      tags,
      title,
      short_description,
      video,
      price,
      _id,
    } = course;
    if (!title) return null;

    if (course?.categories?.length) {
      tags = "";
      course.categories.map((cat) => (tags += `${cat.tags},`));
      tags = tags.slice(0, tags.length - 1);
    }

    if (short_description) {
      short_description = short_description.split("");
      for (let i = short_description.length; i < this.padd_length; i++)
        short_description.push("**");
    }
    if (tags) tags = tags.split(",").filter((tag) => tag);

    return (
      <div
        className={`col-xl-${in_courses ? "6" : "4"} col-lg-${
          in_courses ? "6" : "4"
        } col-md-6 col-sm-12`}
      >
        <div className="crs_grid">
          <div className="crs_grid_thumb">
            {play ? (
              <Video url={video} />
            ) : (
              <Link onClick={this.handle_course} className="crs_detail_link">
                <img
                  src={`${domain}/Images/${image}`}
                  className="img-fluid rounded"
                  alt=""
                  style={{ maxHeight: 400, width: "100%" }}
                />
              </Link>
            )}
            {video || edit_course ? (
              <div
                className="crs_video_ico"
                onClick={edit_course || this.play_video}
              >
                <i
                  className={`fa fa-${
                    edit_course ? "edit" : `${play ? "pause" : "play"}`
                  }`}
                ></i>
              </div>
            ) : null}
            {delete_course ? (
              <div className="crs_locked_ico" onClick={delete_course}>
                <i className={`fa fa-${delete_course ? "trash" : "lock"}`}></i>
              </div>
            ) : null}
          </div>
          <div className="crs_grid_caption" style={{ overflow: "hidden" }}>
            <div
              className="table-responsive-sm overfolow-hidden"
              style={{ width: "100%" }}
            >
              {tags && tags.length ? (
                <div className="mb-2 crs_cates cl_1">
                  <span>{to_title(tags[gen_random_int(tags.length - 1)])}</span>
                </div>
              ) : null}
            </div>

            <div className="crs_title">
              <h4>
                <Link onClick={this.handle_course} className="crs_title_link">
                  {to_title(title)}
                </Link>
              </h4>
            </div>
            <div onClick={this.toggle_description} className="crs_info_detail">
              {short_description ? (
                <div style={{ flexWrap: "wrap", display: "flex" }}>
                  {short_description
                    .slice(
                      0,
                      full_desc ? short_description.length : this.padd_length
                    )
                    .map((d, i) =>
                      d === "**" || d === " " ? <span key={i}>&nbsp;</span> : d
                    )}
                  {full_desc ? "" : "..."}
                </div>
              ) : null}
            </div>
            <div className="preview_crs_info">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "100%" }}
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
                    <span className="currency">&#8358;</span>
                    <span className="theme-cl">{price}</span>
                  </h2>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_linkview">
                  <Link
                    onClick={this.handle_course}
                    className="btn btn_view_detail theme-bg text-light"
                  >
                    {adminstrator ? "View Course" : "Enroll Now"}
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
