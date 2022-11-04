import React from "react";
import { Link } from "react-router-dom";
import { domain } from "../Constants/constants";
import { scroll_to_top } from "../Pages/Adminstrator";

class Certification_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { certification } = this.props;
    let { title, icon, courses, _id } = certification;

    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <div class="crs_cate_wrap style_2">
          <Link
            to={`/courses?certification=${_id}`}
            style={{ textDecorationLine: "none" }}
            class="crs_cate_box"
          >
            <span className="center" onClick={scroll_to_top}>
              <div class="crs_cate_icon">
                <img src={`${domain}/Images/${icon}`} className="img-fluid" />
              </div>
              <div class="crs_cate_caption">
                <span>{title}</span>
              </div>
              <div class="crs_cate_count center">
                <span>{`${courses.length} Courses`}</span>
              </div>
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Certification_course;
