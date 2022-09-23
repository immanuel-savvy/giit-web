import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Featured_course from "./course";

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { category } = this.props;

    let courses = await post_request(`category_courses/${category._id}`);
    this.setState({ courses });
  };

  render() {
    let { category, gray } = this.props;
    let { title, subtitle, section } = category;
    let { courses } = this.state;
    if (courses && !courses.length) return null;

    return (
      <section className={gray ? `gray` : ""}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {courses && courses.length ? (
              new Array(1, 2, 3, 4, 5, 6).map((course, index) => (
                <Featured_course course={courses[0]} key={index} />
              ))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                <Loadindicator />
              </div>
            )}
          </div>
          {courses ? (
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8 mt-2">
                <div className="text-center">
                  <Link
                    to="/courses_layout"
                    className="btn btn-md theme-bg-light theme-cl"
                  >
                    {`Explore More ${to_title(section)} Courses`}
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Courses;
