import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../../Assets/js/utils/functions";
import { get_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";

class Course_sections extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let sections = await get_request("categories");

    this.setState({ sections });
  };

  section = ({ title, courses, image, _id }) => {
    return (
      <div class="grousp_crs" kye={_id}>
        <div class="grousp_crs_left">
          <div class="grousp_crs_thumb">
            <img src={image} class="img-fluid" alt="" />
          </div>
          <div class="grousp_crs_caption">
            <h4>{to_title(title)}</h4>
          </div>
        </div>
        <div class="grousp_crs_right">
          <div class="frt_125">
            <i class="fas fa-book text-warning mr-1"></i>
            {courses || 124}
          </div>
          <div class="frt_but">
            <Link class="btn text-white theme-bg">View Courses</Link>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { sections } = this.state;
    if (sections && !sections.length) return null;

    return (
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <h5>Course Sections</h5>
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          {sections ? (
            sections.map((section) => this.section(section))
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Course_sections;
