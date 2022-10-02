import React from "react";

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
          <div class="edu_wraper">
            <h4 class="edu_title">Certification</h4>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio.
            </p>
            <p>
              Aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto. Sam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
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
