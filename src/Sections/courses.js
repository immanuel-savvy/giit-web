import React from "react";
import Course from "./course";

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: new Array(),
    };
  }

  render() {
    let { courses } = this.state;
    if (!courses.length) return null;

    return (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  explore Featured <span className="theme-cl">Cources</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {courses && courses.length
              ? courses.map((course) => (
                  <Course course={course} key={course._id} />
                ))
              : null}
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8 mt-2">
              <div className="text-center">
                <Link
                  href="/courses_layout_with_sidebar"
                  className="btn btn-md theme-bg-light theme-cl"
                >
                  Explore More Cources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Courses;
