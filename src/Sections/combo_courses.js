import React from "react";
import Combo_course from "./combo_course";

class Combo_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      combos: new Array(
        {
          _id: 1,
          title: "development",
          courses: new Array(
            {
              title: "software",
            },
            { title: "devops" }
          ),
        },
        {
          _id: 2,
          title: "web designing",
          courses: new Array(
            {
              title: "excel",
            },
            { title: "power BI" }
          ),
        },
        {
          _id: 3,
          title: "networking",
          courses: new Array(
            {
              title: "software",
            },
            { title: "devops" }
          ),
        },
        {
          _id: 4,
          title: "web designing",
          courses: new Array(
            {
              title: "excel",
            },
            { title: "power BI" }
          ),
        },
        {
          _id: 5,
          title: "networking",
          courses: new Array(
            {
              title: "software",
            },
            { title: "devops" }
          ),
        },
        {
          _id: 6,
          title: "web designing",
          courses: new Array(
            {
              title: "excel",
            },
            { title: "power BI" }
          ),
        },
        {
          _id: 7,
          title: "networking",
          courses: new Array(
            {
              title: "software",
            },
            { title: "devops" }
          ),
        }
      ),
    };
  }

  render() {
    let { gray } = this.props;
    let { combos } = this.state;

    return (
      <section className={`${gray ? "gray" : ""} min`} id="combo_courses">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>Get any of our course collection</h2>
                <p>
                  Choose one of our combo courses to advance your career and
                  become a skilled professional.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {combos.map((combo, index) => (
              <Combo_course combo={combo} key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Combo_courses;
