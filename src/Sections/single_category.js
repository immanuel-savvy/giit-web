import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";

class Single_category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { category } = this.props;
    let { title, courses } = category;

    return (
      <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <div className="crs_cate_wrap style_2">
          <Link to="/courses_layout_with_sidebar" className="crs_cate_box">
            <div className="crs_cate_icon">
              <i className="fa fa-code"></i>
            </div>
            <div className="crs_cate_caption">
              <span>{to_title(title)}</span>
            </div>
            <div className="crs_cate_count">
              <span>{`${courses} Courses`}</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Single_category;
