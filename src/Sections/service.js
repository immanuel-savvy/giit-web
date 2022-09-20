import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";

class Service extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { service } = this.props;
    let { title, icon } = service;

    return (
      <div className="col-xl-2 col-lg-3 col-md-3 col-sm-2">
        <div className="crs_cate_wrap style_2">
          <Link to={`/contact_us?service=${title}`} className="crs_cate_box">
            <div className="crs_cate_icon">
              <i className={`fa ${icon}`}></i>
            </div>
            <div className="crs_cate_caption">
              <span>{to_title(title)}</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Service;
