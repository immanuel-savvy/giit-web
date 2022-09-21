import React from "react";
import Certification_course from "./certification_course";

class Certification_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: new Array(
        { title: "microsoft certification" },
        { title: "AWS certification" },
        { title: "google cloud certification" },
        { title: "AWS certification" },
        { title: "cissp certification" },
        { title: "google cloud certification" }
      ),
    };
  }

  render() {
    let { title, subtitle } = this.props;
    let { courses } = this.state;

    return (
      <section
        className={`gray`}
        style={{
          background: "linear-gradient(#33bef0, #0a85d9)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2 className="text-light">{title}</h2>
                {subtitle ? <p>{subtitle}</p> : null}
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-sm-12">
              <div className="certification-slide space">
                {courses.length
                  ? courses.map((course, index) => (
                      <Certification_course key={index} course={course} />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Certification_courses;
