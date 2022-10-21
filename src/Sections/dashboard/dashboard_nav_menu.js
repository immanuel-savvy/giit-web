import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../../Assets/js/utils/functions";
import { default_admin } from "../../Constants/constants";
import { emitter } from "../../Giit";

class Dashboard_nav_menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_nav: "dashboard",
      navs: new Array(
        {
          title: "dashboard",
          icon: "fa-th",
        },
        {
          title: "courses",
          icon: "fa-shopping-basket",
          subnav: new Array(
            { title: "manage_courses" },
            { title: "add_new_course" },
            { title: "manage_master_courses" },
            { title: "manage_sections" },
            { title: "add_certification" },
            { title: "manage_combo_courses" },
            { title: "manage_flash_promo" }
          ),
        },
        {
          title: "services",
          icon: "fa-th",
        },
        {
          title: "trusted_by",
          icon: "fa-th",
        },
        {
          title: "testimonials",
          icon: "fa-th",
          subnav: new Array(
            { title: "manage_reviews" },
            { title: "pending_reviews" }
          ),
        },
        {
          title: "blog",
          icon: "fa-th",
          subnav: new Array(
            { title: "manage_articles" },
            { title: "new_article" },
            { title: "manage_categories" }
          ),
        },
        {
          title: "newsletters",
          icon: "fa-envelope",
          subnav: new Array(
            { title: "manage_newsletters" },
            { title: "create_newsletter" },
            { title: "subscribers" }
          ),
        },
        {
          title: "messages",
          icon: "fa-gem",
        },
        {
          title: "enrollment",
          icon: "fa-gem",
          subnav: new Array(
            { title: "enrollment_history" },
            { title: "enroll_a_student" }
          ),
        },
        {
          title: "admins",
          icon: "fa-user-shield",
          subnav: new Array(
            { title: "manage_admins" },
            { title: "add_new_admin" }
          ),
        },
        {
          title: "instructors",
          icon: "fa-user",
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

  render_nav = ({ title, icon, subnav }, i) => {
    let { current_nav } = this.state;

    return subnav ? (
      <li
        key={i}
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
    let { admin } = this.props;
    let { navs } = this.state;

    return (
      <div className="d-navigation">
        <ul id="side-menu">
          {navs.map((nav, i) =>
            admin && admin._id !== default_admin && nav.title === "admins"
              ? null
              : this.render_nav(nav, i)
          )}
        </ul>
      </div>
    );
  };
}

export default Dashboard_nav_menu;
