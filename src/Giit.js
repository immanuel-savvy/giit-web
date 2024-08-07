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
import {
  Flash_promo,
  Footer_context,
  Logged_admin,
  Logged_user,
  Nav_context,
} from "./Contexts";
import Master_courses from "./Pages/Master_courses";
import Blog from "./Pages/Blog";
import Article from "./Pages/Article";
import Enroll from "./Pages/Enroll";
import Verify_email from "./Pages/Verify_email";
import Careers from "./Pages/Careers";
import Testimonials from "./Pages/Testimonials";
import Gallery from "./Pages/Gallery";
import Instructors from "./Pages/Instructors";
import { master_course_alignment } from "./Sections/master_courses";
import FAQS from "./Pages/FAQs";
import University_progressions from "./Pages/University_progressions";
import Visa_assistance from "./Pages/Visa_assistance";
import Admission_assistance from "./Pages/Admission_assistance";
import Services_page from "./Pages/Services";
import Course_template from "./Pages/Course_template";
import Students_works from "./Pages/Student_works";
import Instructor from "./Pages/Instructor";
import Vendor from "./Pages/Vendor";
import Profile from "./Pages/Profile";
import Home2 from "./Pages/Home2";
import { client_domain } from "./Constants/constants";
import New_seminar from "./Pages/New_seminar";
import Seminar from "./Pages/Seminar";
import Seminars from "./Pages/Seminars";
import { save_to_session } from "./Sections/footer";
import Enrollment_successful from "./Pages/Enrollment_successful";
import Edit_profile from "./Pages/Edit_profile";

let emitter = new Emitter();

class Giit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submenus: new Object(),
      subnavs: new Object(),
      loggeduser: "fetching",
      navs: new Array(
        {
          title: "search",
          path: "/courses?search=true",
        },
        {
          title: "home",
          path: "/",
        },
        {
          title: "on-campus",
          path: "/courses",
          submenu: new Array(),
          on_click: () => window.location.assign(`${client_domain}/courses`),
        },
        {
          title: "online courses",
          path: "/online_courses",
          on_click: () =>
            window.location.assign(`${client_domain}/online_courses`),
        },
        {
          title: "ncc uk",
          path: "/ncc",
          submenu: new Array(
            {
              title: "courses",
              path: `/courses?section=ncc`,
            },
            {
              title: "university progressions",
              path: "/university_progressions",
            },
            {
              title: "visa assistance",
              path: "/visa_assistance",
            },
            {
              title: "admission assistance",
              path: "/admission_assistance",
            }
          ),
        },
        {
          title: "about",
          path: "/about",
          on_click: () => window.location.assign(`${client_domain}/about`),
          submenu: new Array(
            {
              title: "who we are",
              path: "/about",
            },
            {
              title: "our instructors",
              path: "/instructors",
            },
            {
              title: "career",
              path: "/career",
            },
            {
              title: "services",
              path: "/services",
            },
            {
              title: "internships",
              path: "https://giitfoundation.org/internship",
            },
            {
              title: "mentorships",
              path: "https://giitfoundation.org/mentorship",
            },
            {
              title: "FAQs",
              path: "/faqs",
            }
          ),
        },
        {
          title: "testimonials",
          path: "/testimonials",
        },
        {
          title: "gallery",
          path: "/gallery",
        },
        {
          title: "blog",
          path: "/blog",
        },
        {
          title: "events",
          path: "",
          submenu: new Array({
            title: "seminars",
            path: `/seminars`,
          }),
        },
        {
          title: "contact",
          path: "/contact_us",
        },
        {
          title: "get started",
          path: "/login",
        }
      ),
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

  load_subnavs = async (current_subnav) => {
    let { submenus } = this.state;

    let courses = await post_request("get_courses", {
      courses: current_subnav.submenu,
    });
    submenus[current_subnav._id] = courses;

    this.setState({
      submenus,
    });
  };

  componentDidMount = async () => {
    !document.getElementsByName("script").length &&
      this.script_paths.map((script_path) => this.append_script(script_path));

    let { navs } = this.state;
    let master_courses = await get_request("master_courses/all");
    if (master_courses && master_courses.map) {
      master_courses = master_courses
        .sort((m1, m2) => {
          let m1_index = master_course_alignment.findIndex((m) => {
              let t = m1.title.toLowerCase().replace(/_/g, " ");
              return t.includes(m) || m.includes(t);
            }),
            m2_index = master_course_alignment.findIndex((m) => {
              let t = m2.title.toLowerCase().replace(/_/g, " ");

              return t.includes(m) || m.includes(t);
            });
          if (m1_index === -1) return 200;
          if (m2_index === -1) return -1;

          return m1_index - m2_index;
        })
        .slice(0, 8);

      master_courses.push({ view_all: true });

      navs[2].submenu = master_courses.map(
        (course) =>
          new Object({
            title: course.title,
            _id: course._id,
            view_all: course.view_all,
            submenu: course.courses,
            on_click: () => this.handle_course(course),
            path: "/course",
          })
      );
      navs[3].submenu = navs[2].submenu;
    }

    let loggeduser = window.sessionStorage.getItem("loggeduser");
    if (loggeduser) loggeduser = JSON.parse(loggeduser);

    this.edit_seminar = (seminar) =>
      this.setState({ seminar_in_edit: seminar }, () => {
        save_to_session("seminar_in_edit", seminar);

        window.location.assign(`${client_domain}/edit_seminar`);
      });

    emitter.listen("edit_seminar", this.edit_seminar);

    let {
      flash_promo,
      banner_stuffs,
      best_instructors_stuffs,
      onboarding_stuffs,
      vendors,
    } = await get_request("entry");
    if (flash_promo && flash_promo.duration_timestamp <= Date.now)
      flash_promo = null;

    this.setState({
      navs,
      loggeduser,
      flash_promo,
      onboarding_stuffs,
      banner_stuffs,
      vendors,
      master_courses: Array.isArray(master_courses)
        ? master_courses
        : new Array(),
      best_instructors_stuffs,
    });

    this.ncc_section = (ncc_section) => this.setState({ ncc_section });

    emitter.listen("ncc_section", this.ncc_section);
  };

  login = (user) =>
    this.setState({ loggeduser: user }, () =>
      save_to_session("loggeduser", user)
    );

  log_admin = (admin) =>
    this.setState({ admin_logged: admin }, () => {
      save_to_session("logged_admin", admin);
    });

  update_loggeduser = (update) => {
    let { loggeduser } = this.state;
    loggeduser = { ...loggeduser, ...update };

    save_to_session("loggeduser", loggeduser);

    this.setState({ loggeduser });
  };

  render = () => {
    let {
      admin_logged,
      banner_stuffs,
      onboarding_stuffs,
      flash_promo,
      loggeduser,
      best_instructors_stuffs,
      subnavs,
      navs,
      master_courses,
      seminar_in_edit,
      vendors,
      submenus,
    } = this.state;

    return (
      <Logged_user.Provider
        value={{
          loggeduser,
          update_loggeduser: this.update_loggeduser,
          login: this.login,
        }}
      >
        <Logged_admin.Provider
          value={{ admin_logged, log_admin: this.log_admin }}
        >
          <Nav_context.Provider
            value={{
              navs,
              subnavs,
              vendors,
              master_courses,
              set_subnav: this.set_subnav,
              load_subnavs: this.load_subnavs,
              submenus,
            }}
          >
            <Footer_context.Provider value={{ master_courses }}>
              <Flash_promo.Provider value={{ flash_promo }}>
                <BrowserRouter>
                  <Routes>
                    <Route
                      index
                      element={
                        <Index
                          banner_stuffs={banner_stuffs}
                          onboarding_stuffs={onboarding_stuffs}
                          best_instructors_stuffs={best_instructors_stuffs}
                        />
                      }
                    />
                    <Route path="online_courses" element={<Home2 />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="contact_us" element={<Contact />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="article" element={<Article />} />
                    <Route
                      path="instructor/:instructor_id"
                      element={<Instructor />}
                    />
                    <Route path="services" element={<Services_page />} />
                    <Route path="enroll" element={<Enroll />} />
                    <Route
                      path="enrollment_successful/:enrollment_id"
                      element={<Enrollment_successful />}
                    />
                    <Route
                      path="course_template"
                      element={<Course_template />}
                    />
                    <Route path="master_courses" element={<Master_courses />} />
                    <Route path="seminar" element={<Seminar />} />
                    <Route path="seminars" element={<Seminars />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                    <Route path="dashboard" element={<Profile />} />
                    <Route path="faqs" element={<FAQS />} />
                    <Route path="edit_profile" element={<Edit_profile />} />
                    <Route path="students_works" element={<Students_works />} />
                    <Route
                      path="university_progressions"
                      element={<University_progressions />}
                    />
                    <Route
                      path="visa_assistance"
                      element={<Visa_assistance />}
                    />
                    <Route
                      path="admission_assistance"
                      element={<Admission_assistance />}
                    />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="instructors" element={<Instructors />} />
                    <Route path="new_seminar" element={<New_seminar />} />
                    <Route
                      path="edit_seminar"
                      element={<New_seminar seminar={seminar_in_edit} />}
                    />
                    <Route path="verify_email" element={<Verify_email />} />
                    <Route
                      path="forgot_password"
                      element={<Forgot_password />}
                    />
                    <Route path="about" element={<About />} />
                    <Route path="vendor/:vendor_uri" element={<Vendor />} />
                    <Route path="course" element={<Course />} />
                    <Route path="career" element={<Careers />} />
                    <Route path="testimonials" element={<Testimonials />} />
                    <Route path="adminstrator" element={<Adminstrator />} />
                    <Route path="*" element={<Page_not_found />} />
                  </Routes>
                </BrowserRouter>
              </Flash_promo.Provider>
            </Footer_context.Provider>
          </Nav_context.Provider>
        </Logged_admin.Provider>
      </Logged_user.Provider>
    );
  };
}

export default Giit;
export { emitter };
