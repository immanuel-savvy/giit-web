import React from "react";
import { Link } from "react-router-dom";

class Single_category_colored extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { category } = this.props;
    let { title, courses, image } = category;

    return (
      <div className="col-lg-4 col-md-4 col-sm-6">
        <div className="edu_cat_2 cat-1">
          <div className="edu_cat_icons">
            <Link className="pic-main" to={`/courses?category=${title}`}>
              <img src={image} className="img-fluid" alt="" />
            </Link>
          </div>
          <div className="edu_cat_data">
            <h4 className="title">
              <Link to="#">{title}</Link>
            </h4>
            <ul className="meta">
              <li className="video">
                <i className="ti-video-clapper"></i>
                {`${courses} Courses`}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Single_category_colored;
