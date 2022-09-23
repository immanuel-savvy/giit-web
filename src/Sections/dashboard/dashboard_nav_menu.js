import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../../Assets/js/utils/functions";
import { emitter } from "../../Giit";

class Dashboard_nav_menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_nav: "dashboard",
      navs: new Array(
        {
          title: "dashboard",
        },
        {
          title: "courses",
          subnav: new Array(
            { title: "manage_courses" },
            { title: "add_new_course" },
            { title: "course_category" }
          ),
        },
        {
          title: "enrollment",
          subnav: new Array(
            { title: "enrollment_history" },
            { title: "enroll_a_student" }
          ),
        },
        {
          title: "admins",
          subnav: new Array(
            { title: "manage_admins" },
            { title: "add_new_admin" }
          ),
        },
        {
          title: "instructors",
          subnav: new Array(
            { title: "manage_instructors" },
            { title: "add_new_instructor" }
          ),
        },
        {
          title: "students",
          subnav: new Array(
            { title: "manage_students" },
            { title: "add_new_student" }
          ),
        }
      ),
    };
  }

  nav_click = (title) =>
    this.setState({ current_nav: title }, () =>
      emitter.emit("dash_nav_click", title)
    );

  nav_sub_click = (subtitle) =>
    this.setState({ current_nav: subtitle }, () =>
      emitter.emit("dash_nav_click", subtitle)
    );

  render_nav = ({ title, icon, subnav }) => {
    let { current_nav } = this.state;

    return subnav ? (
      <li
        className={`${current_nav === title ? "active dropdown" : "dropdown"}`}
      >
        <a href="javascript:void(0);">
          <i className={`fas ${icon}`}></i>
          {to_title(title.replace(/_/g, " "))}
          <span className="ti-angle-left"></span>
        </a>
        <ul className={`nav nav-second-level`}>
          {subnav.map((sub) => (
            <li>
              <Link onClick={() => this.nav_sub_click(sub.title)}>
                {to_title(sub.title.replace(/_/g, " "))}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ) : (
      <li className={`${current_nav === title ? "active" : ""}`}>
        <Link onClick={() => this.nav_click(title)}>
          <i className={`fas ${icon}`}></i>
          {to_title(title.replace(/_/g, " "))}
        </Link>
      </li>
    );
  };

  render = () => {
    let { navs } = this.state;

    return (
      <div className="d-navigation">
        <ul id="side-menu">{navs.map((nav) => this.render_nav(nav))}</ul>
      </div>
    );
  };
}

export default Dashboard_nav_menu;
