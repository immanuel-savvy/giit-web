import React from "react";
import { to_title } from "../Assets/js/utils/functions";
import { COST_SPREAD, SKILL_LEVEL } from "../Constants/constants";

class Courses_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.setState({ categories: new Array() });
  };

  render_categories = () => {
    let { categories } = this.state;
    if (!categories || (categories && !categories.length)) return null;

    return (
      <div className="form-group">
        <div className="simple-input">
          <select id="cates" className="form-control">
            <option value="">--Select a category--</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                IT & Software
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  render_top_instructors = () => {
    let { top_instructors } = this.state;
    if (!top_instructors || (top_instructors && !top_instructors.length))
      return null;

    return (
      <div className="form-group">
        <h6>Top Instructor</h6>
        <ul className="no-ul-list mb-3">
          {top_instructors.map((instructor) => (
            <li key={instructor._id}>
              <input
                id={instructor._id}
                className="checkbox-custom"
                name="aa-41"
                type="checkbox"
              />
              <label for="aa-41" className="checkbox-custom-label">
                Keny White<i className="count">{instructor.courses}</i>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  render_skill_level = () => (
    <div className="form-group">
      <h6>Skill Level</h6>
      <ul className="no-ul-list mb-3">
        {SKILL_LEVEL.map((level, index) => (
          <li key={index}>
            <input
              id={level}
              className="checkbox-custom"
              name="l1"
              type="checkbox"
            />
            <label for="l1" className="checkbox-custom-label">
              {to_title(level)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  render_cost_spread = () => (
    <div className="form-group">
      <h6>Price</h6>
      <ul className="no-ul-list mb-3">
        {COST_SPREAD.map((spread, index) => {
          let course_count = 0;
          let { courses } = this.props;
          if (spread !== COST_SPREAD[0] && courses && Array.isArray(courses))
            courses.map((course) => {
              if (course.is_free && spread === COST_SPREAD[1]) course_count++;
              else if (!course.is_free && spread === COST_SPREAD[2])
                course_count++;
            });
          else course_count = (courses && courses.length) || 0;

          return (
            <li key={index}>
              <input
                id={spread}
                className="checkbox-custom"
                name="p1"
                type="checkbox"
              />
              <label for="p1" className="checkbox-custom-label">
                {to_title(spread)}
                <i className="count">{course_count}</i>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );

  render() {
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
                    placeholder="Search Your Cources"
                  />
                  <i className="ti-search"></i>
                </div>
              </div>

              {this.render_categories()}

              {this.render_top_instructors()}

              {this.render_skill_level()}

              {this.render_cost_spread()}

              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 pt-4">
                  <button className="btn theme-bg rounded full-width">
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
