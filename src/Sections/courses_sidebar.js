import React from "react";
import { to_title } from "../Assets/js/utils/functions";
import { get_request } from "../Assets/js/utils/services";
import { SKILL_LEVEL } from "../Constants/constants";

class Courses_sidebar extends React.Component {
  constructor(props) {
    super(props);

    let { master_course, section } = this.props;
    this.state = {
      skill_levels: new Array(),
      master_course,
      section,
      cates: true,
    };
  }

  set_search_param = ({ target }) =>
    this.setState({ search_param: target.value });

  set_category = ({ target }) => this.setState({ master_course: target.value });

  set_section = ({ target }) => this.setState({ section: target.value });

  set_certification = ({ target }) =>
    this.setState({ certification: target.value });

  set_skill_level = (level) => {
    let { skill_levels } = this.state;

    if (skill_levels.includes(level))
      skill_levels = skill_levels.filter((level_) => level_ !== level);
    else skill_levels.push(level);

    this.setState({ skill_levels });
  };

  componentDidMount = async () => {
    let master_courses = await get_request("master_courses/all");
    let sections = await get_request("sections");
    let certifications = await get_request("certifications");

    this.setState({ master_courses, sections, certifications });
  };

  render_selections = (prop) => {
    let state_prop = this.state[prop];
    let prop_singular =
      prop === "master_courses"
        ? "master_course"
        : prop.slice(1, prop.length - 1);
    let state_prop_single = this.state[prop_singular];

    if (!state_prop || (state_prop && !state_prop.length)) return null;

    return (
      <div className="form-group">
        <br />
        <h6>{`${to_title(prop)}`}</h6>
        <div className="simple-input">
          <select
            id={prop}
            defaultValue={state_prop_single}
            onChange={this[`set_${prop_singular}`]}
            className="form-control"
          >
            <option value="">{`-- All ${to_title(prop)}--`}</option>
            {state_prop.map((prop_item) => (
              <option key={prop_item._id} value={prop_item._id}>
                {to_title(prop_item.title)}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  render_skill_level = () => (
    <div className="form-group">
      <br />
      <h6>Skill Level</h6>
      <ul className="no-ul-list mb-3">
        {SKILL_LEVEL.map((level, index) => (
          <li key={index}>
            <input
              id={level}
              className="checkbox-custom"
              name="l1"
              type="checkbox"
              onChange={() => this.set_skill_level(level)}
              checked={this.state.skill_levels.includes(level)}
            />
            <label for={level} className="checkbox-custom-label">
              {to_title(level)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  filter = async (e) => {
    e.preventDefault();

    let { search_param, certification, section, master_course, skill_levels } =
      this.state;

    let filter = new Object();
    if (search_param) filter.search_param = search_param;
    if (section) filter.section = section;
    if (master_course) filter.master_course = master_course;
    if (certification) filter.certification = certification;
    if (skill_levels.length) filter.skill_levels = skill_levels;

    await this.props.fetch_courses(filter);

    this.setState(
      {
        search_param: "",
        master_course: "",
        skill_levels: new Array(),
        cates: false,
      },
      () => this.setState({ cates: true })
    );
  };

  render() {
    let { search_param, cates } = this.state;

    return (
      <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
        <div className="page-sidebar p-0">
          <a
            className="filter_links"
            data-toggle="collapse"
            href="#fltbox"
            role="button"
            aria-expanded="false"
            aria-controls="fltbox"
          >
            Open Advance Filter<i className="fa fa-sliders-h ml-2"></i>
          </a>
          <div className="collapse" id="fltbox">
            <div className="sidebar-widgets p-4">
              <div className="form-group">
                <div className="input-with-icon">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Your Courses"
                    value={search_param}
                    onChange={this.set_search_param}
                  />
                  <i className="ti-search"></i>
                </div>
              </div>

              {cates ? this.render_selections("master_courses") : null}

              {cates ? this.render_selections("sections") : null}

              {cates ? this.render_selections("certifications") : null}

              {this.render_skill_level()}

              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 pt-4">
                  <button
                    onClick={this.filter}
                    style={{ color: "#fff" }}
                    className="btn theme-bg rounded full-width"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses_sidebar;
