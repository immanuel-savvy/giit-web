import React from "react";
import { Link } from "react-router-dom";
import Featured_course from "./course";
import Course from "./remote_online_course";

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: new Array({
        title: "UI/UX Design pattern for successfull software Applications",
        views_string: "92K",
        enrollments_string: "10K",
        videos: 24,
        tags: new Array("design"),
        _id: 1,
        cost: 75000,
      }),
    };
  }

  render() {
    let { featured } = this.props;
    let { courses } = this.state;
    if (!courses.length) return null;

    return (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Get Featured <span className="theme-cl">Cources</span>
                </h2>
                <p>Accelerate your career in Tech now</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {courses && courses.length
              ? new Array(1, 2, 3, 4, 5, 6, 7, 8).map((course, index) =>
                  featured ? (
                    <Featured_course course={courses[0]} key={index} />
                  ) : (
                    <Course course={courses[0]} key={index} />
                  )
                )
              : null}
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8 mt-2">
              <div className="text-center">
                <Link
                  to="/courses_layout"
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
