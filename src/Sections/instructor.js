import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import Preview_image from "../Components/preview_image";

class Instructor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { instructor, full, remove, edit } = this.props;
    if (!instructor) return;

    let { name, profession, reviews, uri, _id, image, image_hash } =
      instructor || {};

    return (
      <div class={!full ? "col-md-3 col-lg-2 col-sm-12 mb-3" : "lios_item"}>
        <div class="crs_trt_grid shadow_none brd">
          <div class="crs_trt_thumb mx-auto">
            <Link
              to={`/instructor/${uri}`}
              class="crs_trt_thum_link mx-auto"
              style={{ textAlign: "center" }}
            >
              <Preview_image image={image} image_hash={image_hash} />
            </Link>
          </div>
          {edit ? (
            <div className="crs_video_ico" onClick={edit || this.play_video}>
              <i className={`fa fa-edit`}></i>
            </div>
          ) : null}
          {remove ? (
            <div className="crs_locked_ico" onClick={remove}>
              <i className={`fa fa-${remove ? "trash" : "lock"}`}></i>
            </div>
          ) : null}
          <div class="crs_trt_caption large" style={{ padding: 20 }}>
            <div class="instructor_tag">
              <span>{to_title(profession)}</span>
            </div>
            <div class="instructor_title">
              <h4>
                <Link to={`/instructor/${uri}`}>{to_title(name)}</Link>
              </h4>
            </div>
            <div class="trt_rate_inf">
              <i class="fa fa-star filled"></i>
              <i class="fa fa-star filled"></i>
              <i class="fa fa-star filled"></i>
              <i class="fa fa-star filled"></i>
              <i class="fa fa-star-half filled"></i>
              <span class="alt_rates">{`(${reviews || 0} Reviews)`}</span>
            </div>
          </div>
          <div class="crs_trt_footer">
            <div class="crs_fl_last">
              <div class="foot_list_info">
                <div class="crs_trt_caption" style={{ padding: 0 }}>
                  <Link
                    to={`/courses?instructor=${_id}`}
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

export default Instructor;
