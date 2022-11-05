import React from "react";
import Certification_courses from "./certification_courses";

class Course_overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  tabname = "overview";

  render() {
    let { course, active_tab } = this.props;
    let {
      description,
      short_description,
      what_you_will_learn,
      requirements,
      certifications,
    } = course;
    description = description || short_description;
    if (requirements && !requirements.length) requirements = null;

    return (
      <div
        class={`tab-pane fade ${
          active_tab === this.tabname ? " show active" : ""
        }`}
        id="overview"
        role="tabpanel"
        aria-labelledby="overview-tab"
      >
        <div class="edu_wraper">
          <h4 class="edu_title">Course Overview</h4>
          {description.split("\n").map((d, i) => (
            <p key={i}>{d}</p>
          ))}

          {requirements && requirements.length ? <h6>Requirements</h6> : null}
          {requirements && requirements.length ? (
            <ul class="simple-list p-0">
              {requirements.map((requirement, i) => (
                <li key={i}>{requirement}</li>
              ))}
            </ul>
          ) : null}
        </div>

        {certifications && certifications.length ? (
          <div>
            <h4 class="edu_title">Certifications</h4>
            <Certification_courses certifications={certifications} />
          </div>
        ) : null}

        {what_you_will_learn && what_you_will_learn.length ? (
          <div class="edu_wraper">
            <h4 class="edu_title">What you'll learn</h4>
            <ul class="lists-3 row">
              {what_you_will_learn.map((learn, i) => (
                <li key={i} class="col-xl-4 col-lg-6 col-md-6 m-0">
                  {learn}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Course_overview;