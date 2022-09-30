import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";

class Course_curriculum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  tabname = "curriculum";

  componentDidMount = async () => {
    let { course } = this.props;

    let curriculum = await get_request(`curriculum/${course._id}`);
    this.setState({ curriculum });
  };

  curriculum = ({ title, sections, _id }, index) => {
    return (
      <div class="card" key={_id}>
        <div id="headingOne" class="card-header bg-white shadow-sm border-0">
          <h6 class="mb-0 accordion_title">
            <a
              href="#"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              class="d-block position-relative text-dark collapsible-link py-2"
            >
              {`Part ${String(index).padStart(2, "0")}: ${title}`}
            </a>
          </h6>
        </div>
        <div
          id="collapseOne"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
          class="collapse show"
        >
          <div class="card-body pl-3 pr-3">
            <ul class="lectures_lists">
              {sections.map(({ title, book, video }, index) => (
                <li key={index} class="complete">
                  <div class="lectures_lists_title">
                    <i class="fas fa-check dios"></i>
                  </div>
                  {title}
                  {video ? (
                    <span class="cls_timing">40:20</span>
                  ) : book ? (
                    <></>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  toggle_curriculum_form = () =>
    this.setState({ show_form: !this.state.show_form });

  curriculum_btn = () => {
    return (
      <div className="d-flex align-items-center justify-content-center my-5">
        <div class="elkios" onClick={this.toggle_curriculum_form}>
          <a href="#" class="add_new_btn">
            <i class="fas fa-plus-circle mr-1"></i>Add Curriculum
          </a>
        </div>
      </div>
    );
  };

  render() {
    let { active_tab } = this.props;
    let { curriculum } = this.state;

    return (
      <div
        class={`tab-pane fade ${
          active_tab === this.tabname ? " show active" : ""
        }`}
        id="curriculum"
        role="tabpanel"
        aria-labelledby="curriculum-tab"
      >
        <div class="edu_wraper">
          <h4 class="edu_title">Course Circullum</h4>

          {curriculum ? (
            curriculum.map ? (
              <div id="accordionExample" class="accordion shadow circullum">
                {curriculum.map((curr) => this.curriculum(curr))}
              </div>
            ) : (
              this.curriculum_btn()
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Course_curriculum;
