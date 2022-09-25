import React from "react";
import { to_title } from "../Assets/js/utils/functions";

class Combo_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  courses_string = (courses) => {
    let str = "";
    courses.map((course) => (str += `${course.title} + `));

    return to_title(str.slice(0, str.length - 3));
  };

  render() {
    let { combo } = this.props;
    let { courses } = combo;

    return (
      <div className="col-lg-4 col-md-4 col-sm-6 d-flex">
        <div className="edu_cat_2 cat-1 combo_course">
          <div className="d-flex align-items-center justify-content-between">
            <div>{this.courses_string(courses)}</div>
            <div>
              <img
                src="../Assets/css/img/lightbox-next.png"
                height="20"
                width="20"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Combo_course;
