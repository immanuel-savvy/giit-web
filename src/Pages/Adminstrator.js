import React from "react";
import { emitter } from "../Giit";
import Contact_us_today from "../Sections/contact_us_today";
import Add_new_admins from "../Sections/dashboard/add_new_admins";
import Add_new_course from "../Sections/dashboard/add_new_course";
import Add_new_instructor from "../Sections/dashboard/add_new_instructor";
import Add_new_student from "../Sections/dashboard/add_new_student";
import Course_category from "../Sections/dashboard/course_category";
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
      this.setState({ current_nav: nav_title });

    emitter.listen("dash_nav_click", this.dash_nav_click);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("dash_nav_click", this.dash_nav_click);
  };

  nav_et_component = new Object({
    dashboard: <Dashboard_landing />,
    manage_courses: <Manage_courses />,
    add_new_course: <Add_new_course />,
    course_category: <Course_category />,
    enrollment_history: <Enrollment_history />,
    enroll_a_student: <Enroll_a_student />,
    manage_admins: <Manage_admins />,
    add_new_admin: <Add_new_admins />,
    manage_instructors: <Manage_instructors />,
    add_new_instructor: <Add_new_instructor />,
    manage_students: <Manage_students />,
    add_new_student: <Add_new_student />,
  });

  render() {
    let { current_nav } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="dashboard" />
        <div class="clearfix"></div>
        <section class="gray pt-4">
          <div class="container-fluid">
            <div class="row">
              <Dashboard_navbar />
              {this.nav_et_component[current_nav]}
            </div>
          </div>
        </section>

        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Adminstrator;
