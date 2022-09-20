import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import Featured_course from "./course";

class Courses extends React.Component {
  constructor(props) {
    super(props);
    let { section } = this.props;

    this.state = {
      courses:
        section === "degree"
          ? new Array({
              title: "Data Science Master",
              views_string: "92K",
              enrollments_string: "10K",
              videos: 24,
              tags: new Array("design"),
              _id: 1,
              cost: 75000,
            })
          : section === "master"
          ? new Array({
              title: "Cyber Security Master",
              views_string: "92K",
              enrollments_string: "10K",
              videos: 24,
              tags: new Array("design"),
              _id: 1,
              cost: 75000,
            })
          : new Array({
              title: "Azure Devops",
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
    let { title, subtitle, section, bg } = this.props;
    let { courses } = this.state;
    if (!courses.length) return null;

    return (
      <section className={bg === "gray" ? "gray" : ""}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  {/* Get Featured <span className="theme-cl">Cources</span> */}
                  {title}
                </h2>
                <p>{subtitle}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {courses && courses.length
              ? new Array(1, 2, 3, 4, 5, 6).map((course, index) => (
                  <Featured_course course={courses[0]} key={index} />
                ))
              : null}
          </div>
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
        </div>
      </section>
    );
  }
}

export default Courses;
