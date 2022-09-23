import React from "react";
import Loadindicator from "../Components/loadindicator";
import Certification_course from "./certification_course";

class Certification_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, gray, subtitle } = this.props;
    let { courses } = this.state;

    if (courses && !courses.length) return null;

    return (
      <section
        className={gray ? `gray` : ""}
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
              {courses ? (
                <div className="certification-slide space">
                  {courses.map((course, index) => (
                    <Certification_course key={index} course={course} />
                  ))}
                </div>
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Certification_courses;
