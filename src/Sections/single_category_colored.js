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
      <div class="col-lg-4 col-md-4 col-sm-6">
        <div class="edu_cat_2 cat-1">
          <div class="edu_cat_icons">
            <Link class="pic-main" to={`/courses?category=${title}`}>
              <img src={image} class="img-fluid" alt="" />
            </Link>
          </div>
          <div class="edu_cat_data">
            <h4 class="title">
              <Link to="#">{title}</Link>
            </h4>
            <ul class="meta">
              <li class="video">
                <i class="ti-video-clapper"></i>
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
