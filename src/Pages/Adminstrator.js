import React from "react";
import { emitter } from "../Giit";
import Contact_us_today from "../Sections/contact_us_today";
import Add_new_admins from "../Sections/dashboard/add_new_admins";
import Add_new_course from "../Sections/dashboard/add_new_course";
import Add_new_instructor from "../Sections/dashboard/add_new_instructor";
import Add_new_student from "../Sections/dashboard/add_new_student";
import Manage_master_courses from "../Sections/dashboard/manage_master_courses";
import Manage_sections from "../Sections/dashboard/manage_sections";
import Dashboard_landing from "../Sections/dashboard/dashboard_landing";
import Dashboard_navbar from "../Sections/dashboard/dashboard_navbar";
import Enrollment_history from "../Sections/dashboard/enrollment_history";
import Enroll_a_student from "../Sections/dashboard/enroll_a_student";
import Manage_admins from "../Sections/dashboard/manage_admins";
import Manage_courses from "../Sections/dashboard/manage_courses";
import Manage_instructors from "../Sections/dashboard/manage_instructors";
import Manage_students from "../Sections/dashboard/manage_students";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Add_certification from "../Sections/dashboard/add_certification";
import Manage_flash_promo from "../Sections/dashboard/manage_flash_promo";
import { Logged_admin } from "../Contexts";
import Admin_login from "../Sections/dashboard/admin_login";
import Manage_combo_courses from "../Sections/dashboard/manage_combo_courses";
import Manage_services from "../Sections/dashboard/Manage_services";
import Manage_trusted_by from "../Sections/dashboard/manage_trusted_by";
import Manage_reviews from "../Sections/dashboard/manage_reviews";
import New_article from "../Sections/dashboard/new_article";
import Manage_articles from "../Sections/dashboard/manage_articles";
import Manage_article_categories from "../Sections/dashboard/manage_article_categories";

class Adminstrator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current_nav: "dashboard" };
  }

  script_paths = new Array(
    "../Assets/js/raphael.min.js",
    "../Assets/js/morris.min.js",
    "../Assets/js/morris.js"
  );

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = path;
    script.async = true;
    document.body.appendChild(script);
  };

  componentDidMount = () => {
    document.title = "Dashboard | Globalstar Innovative Information Technology";

    this.script_paths.map((script_path) => this.append_script(script_path));

    this.dash_nav_click = (nav_title) =>
      this.setState({ current_nav: nav_title, course: null });

    this.edit_course = (course) =>
      this.setState({ current_nav: "add_new_course", course });

    this.edit_article = (article) =>
      this.setState({ current_nav: "new_article", article });

    emitter.listen("dash_nav_click", this.dash_nav_click);
    emitter.listen("edit_course", this.edit_course);
    emitter.listen("edit_article", this.edit_article);

    document.title =
      "Adminstrator | Globalstar Innovative Information Technology";
  };

  componentWillUnmount = () => {
    emitter.remove_listener("edit_course", this.edit_course);
    emitter.remove_listener("dash_nav_click", this.dash_nav_click);
  };

  nav_et_component = () =>
    new Object({
      dashboard: <Dashboard_landing />,
      manage_courses: <Manage_courses />,
      add_new_course: <Add_new_course course={this.state.course} />,
      manage_master_courses: <Manage_master_courses />,
      manage_sections: <Manage_sections />,
      enrollment_history: <Enrollment_history />,
      enroll_a_student: <Enroll_a_student />,
      manage_admins: <Manage_admins />,
      add_new_admin: <Add_new_admins />,
      manage_instructors: <Manage_instructors />,
      add_new_instructor: <Add_new_instructor />,
      manage_students: <Manage_students />,
      add_new_student: <Add_new_student />,
      services: <Manage_services />,
      trusted_by: <Manage_trusted_by />,
      manage_reviews: <Manage_reviews />,
      manage_combo_courses: <Manage_combo_courses />,
      add_certification: <Add_certification />,
      manage_flash_promo: <Manage_flash_promo />,
      manage_categories: <Manage_article_categories />,
      new_article: <New_article article={this.state.article} />,
      manage_articles: <Manage_articles />,
    });

  render() {
    let { current_nav } = this.state;

    return (
      <Logged_admin.Consumer>
        {({ admin_logged, log_admin }) => {
          return admin_logged ? (
            <div id="main-wrapper">
              <Header page="dashboard" />
              <div className="clearfix"></div>
              <section className="gray pt-4">
                <div className="container-fluid">
                  <div className="row">
                    <Dashboard_navbar admin={admin_logged} />
                    {this.nav_et_component()[current_nav]}
                  </div>
                </div>
              </section>

              <Contact_us_today />
              <Footer />
            </div>
          ) : (
            <Admin_login log_admin={log_admin} />
          );
        }}
      </Logged_admin.Consumer>
    );
  }
}

export default Adminstrator;
