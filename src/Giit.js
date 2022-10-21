import "./Assets/css/styles.css";
import "./Assets/css/custom.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Home";
import Courses from "./Pages/Courses";
import Contact from "./Pages/Contact";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Page_not_found from "./Pages/404";
import About from "./Pages/About";
import Forgot_password from "./Pages/Forgot_password";
import Adminstrator from "./Pages/Adminstrator";
import Emitter from "semitter";
import { get_request, post_request } from "./Assets/js/utils/services";
import Course from "./Pages/Course";
import { Logged_admin, Logged_user, Nav_context } from "./Contexts";
import Master_courses from "./Pages/Master_courses";
import Blog from "./Pages/Blog";
import Article from "./Pages/Article";
import Enroll from "./Pages/Enroll";
import Verify_email from "./Pages/Verify_email";
import Careers from "./Pages/Careers";
import Testimonials from "./Pages/Testimonials";
import Handle_image_upload from "./Components/handle_image_upload";

let emitter = new Emitter();

class Giit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggeduser: "fetching",
      navs: new Array(
        {
          title: "home",
          path: "/",
        },
        {
          title: "courses",
          path: "/courses",
          submenu: new Array(),
        },
        {
          title: "about",
          path: "/about",
        },
        {
          title: "contact",
          path: "/contact_us",
        },
        {
          title: "career",
          path: "/career",
        },
        {
          title: "testimonials",
          path: "/testimonials",
        }
      ),
      subnavs: new Object(),
    };
  }

  script_paths = new Array(
    "../Assets/js/jquery.min.js",
    "../Assets/js/popper.min.js",
    "../Assets/js/bootstrap.min.js",
    "../Assets/js/select2.min.js",
    "../Assets/js/slick.js",
    "../Assets/js/moment.min.js",
    "../Assets/js/daterangepicker.js",
    "../Assets/js/summernote.min.js",
    "../Assets/js/metisMenu.min.js",
    "../Assets/js/custom.js",
    "../Assets/js/my_custom.js"
  );

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = path;
    script.async = false;
    document.body.appendChild(script);
  };

  handle_course = (course) => {
    window.sessionStorage.setItem("course", JSON.stringify(course));
    emitter.emit("push_course", course);
  };

  set_subnav = async (nav) => {
    let { subnavs } = this.state;
    if (subnavs[nav._id]) return;

    let navs = await post_request("get_courses", { courses: nav.submenu });
    subnavs[nav._id] = navs.map((nav) => ({
      ...nav,
      path: "/course",
      on_click: () => this.handle_course(nav),
    }));
    this.setState({ subnavs });
  };

  componentDidMount = async () => {
    !document.getElementsByName("script").length &&
      this.script_paths.map((script_path) => this.append_script(script_path));

    let { navs } = this.state;
    let master_courses = await get_request("master_courses/all");
    if (master_courses && master_courses.map)
      navs[1].submenu = master_courses.map(
        (course) =>
          new Object({
            title: course.title,
            _id: course._id,
            submenu: course.courses,
            on_click: () => this.handle_course(course),
            path: "/course",
          })
      );

    let loggeduser = window.sessionStorage.getItem("loggeduser");
    if (loggeduser) loggeduser = JSON.parse(loggeduser);

    this.setState({ navs, loggeduser });
  };

  login = (user) =>
    this.setState({ loggeduser: user }, () =>
      window.sessionStorage.setItem("loggeduser", JSON.stringify(user))
    );

  log_admin = (admin) => this.setState({ admin_logged: admin });

  render = () => {
    let { navs, admin_logged, loggeduser, subnavs } = this.state;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="Savvy"
            content="Globalstar Innovative Information Technology"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="../assets/images/gt_favicon.png" />
        </head>

        <body>
          <Logged_user.Provider value={{ loggeduser, login: this.login }}>
            <Logged_admin.Provider
              value={{ admin_logged, log_admin: this.log_admin }}
            >
              <Nav_context.Provider
                value={{ navs, subnavs, set_subnav: this.set_subnav }}
              >
                <BrowserRouter>
                  <Routes>
                    <Route index element={<Index />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="contact_us" element={<Contact />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="article" element={<Article />} />
                    <Route path="enroll" element={<Enroll />} />
                    <Route path="master_courses" element={<Master_courses />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                    <Route path="verify_email" element={<Verify_email />} />
                    <Route
                      path="forgot_password"
                      element={<Forgot_password />}
                    />
                    <Route path="about" element={<About />} />
                    <Route path="course" element={<Course />} />
                    <Route path="career" element={<Careers />} />
                    <Route path="testimonials" element={<Testimonials />} />
                    <Route path="adminstrator" element={<Adminstrator />} />
                    <Route path="*" element={<Page_not_found />} />
                  </Routes>
                </BrowserRouter>
              </Nav_context.Provider>
            </Logged_admin.Provider>
          </Logged_user.Provider>
        </body>
      </html>
    );
  };
}

export default Giit;
export { emitter };
