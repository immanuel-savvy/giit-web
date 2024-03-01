import React from "react";
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
            { title: "manage_vendors" },
            { title: "add_certification" },
            { title: "manage_combo_courses" },
            { title: "manage_flash_promo" }
          ),
        },
        {
          title: "instructors",
          icon: "fa-user",
          subnav: new Array(
            { title: "manage_instructors" },
            { title: "add_instructor" }
          ),
        },
        {
          title: "university_progression",
          icon: "fa-th",
          subnav: new Array(
            {
              title: "manage_universities",
            },
            {
              title: "page_details",
            }
          ),
        },
        {
          title: "about",
          icon: "fa-th",
          subnav: new Array({
            title: "about_statement",
          }),
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
            { title: "pending_reviews" },
            { title: "alumni_overview" },
            { title: "video_reviews" }
          ),
        },
        { title: "gallery", icon: "fa-image" },
        {
          title: "careers",
          icon: "fa-image",
          subnav: new Array(
            {
              title: "career_page",
            },
            { title: "manage_work_benefits" },
            { title: "manage_vacancies" }
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
          title: "sections",
          icon: "fa-th",
          subnav: new Array(
            { title: "onboarding" },
            { title: "best_instructors" },
            { title: "FAQs" }
          ),
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
          title: "students",
          subnav: new Array(
            { title: "manage_students" },
            { title: "add_new_student" },
            { title: "students_works" }
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

  render_nav = ({ title, icon, subnav }, index) => {
    let { current_nav, current_slide_index } = this.state;

    return subnav ? (
      <div>
        <div id="headingOne" class="card-header bg-white shadow-sm border-0">
          <h6 class="m-2 accordion_title">
            <a
              href="#"
              data-toggle="collapse"
              data-target={`#collapse${index}`}
              aria-expanded={current_slide_index === index ? "true" : "false"}
              aria-controls={`collapse${index}`}
              class="d-block position-relative text-dark collapsible-link py-2"
            >
              {`${to_title(title.replace(/_/g, " "))}`}
            </a>
          </h6>
        </div>
        <div
          id={`collapse${index}`}
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
          class={`collapse ${current_slide_index === index ? "show" : ""}`}
          style={{ margin: 0, marginLeft: 0, padding: 0, paddingRight: 0 }}
        >
          <div>
            {subnav.map(({ title }, index) => (
              <li
                style={{ flexWrap: "wrap", padding: 10, cursor: "pointer" }}
                key={index}
                class={"incomplete" || "complete"}
                onClick={() => this.nav_dash(title)}
              >
                {to_title(title.replace(/_/g, " "))}
              </li>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <h6
        class="p-2"
        style={{ cursor: "pointer" }}
        onClick={() => this.nav_dash(title)}
      >
        <a class="d-block position-relative text-dark py-2">{`${to_title(
          title.replace(/_/g, " ")
        )}`}</a>
      </h6>
    );
  };

  nav_dash = (title) => emitter.emit("dash_nav_click", title);

  render = () => {
    let { admin } = this.props;
    let { navs } = this.state;

    return (
      <div id="accordionExample" class="accordion shadow circullum">
        {navs.map((nav, i) =>
          admin && admin._id !== default_admin && nav.title === "admins"
            ? null
            : this.render_nav(nav, i)
        )}
      </div>
    );
  };
}

export default Dashboard_nav_menu;
