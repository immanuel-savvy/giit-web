import "./Assets/css/styles.css";

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
import { get_request } from "./Assets/js/utils/services";
import Course from "./Pages/Course";

let emitter = new Emitter();

class Giit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navs: new Array(
        {
          title: "home",
          path: "/",
        },
        {
          title: "courses",
          path: "/courses",
        },
        {
          title: "about",
          path: "/about",
        },
        {
          title: "contact",
          path: "/contact_us",
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

  componentDidMount = async () => {
    document.title = "Globalstar Innovative Information Technology";

    !document.getElementsByName("script").length &&
      this.script_paths.map((script_path) => this.append_script(script_path));

    let { navs } = this.state;

    let courses_categories = await get_request("categories");
    let courses_nav = navs.find((nav) => nav.title === "courses");

    if (courses_categories.length) {
      courses_nav.submenu = new Array();
      courses_categories.map((cat) =>
        courses_nav.submenu.push({
          title: cat.title,
          path: `/courses?category=${cat._id}`,
        })
      );
      navs[1] = courses_nav;
    }

    this.setState({ navs });
  };

  render = () => {
    let { navs } = this.state;

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
          <BrowserRouter>
            <Routes>
              <Route index element={<Index navs={navs} />} />
              <Route path="courses" element={<Courses navs={navs} />} />
              <Route path="contact_us" element={<Contact navs={navs} />} />
              <Route path="signup" element={<Signup navs={navs} />} />
              <Route path="login" element={<Login navs={navs} />} />
              <Route
                path="forgot_password"
                element={<Forgot_password navs={navs} />}
              />
              <Route path="about" element={<About navs={navs} />} />
              <Route path="course" element={<Course navs={navs} />} />
              <Route
                path="adminstrator"
                element={<Adminstrator navs={navs} />}
              />
              <Route path="*" element={<Page_not_found navs={navs} />} />
            </Routes>
          </BrowserRouter>
        </body>
      </html>
    );
  };
}

export default Giit;
export { emitter };
