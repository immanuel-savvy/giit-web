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

class Giit extends React.Component {
  constructor(props) {
    super(props);
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
    script.async = true;
    document.body.appendChild(script);
  };

  componentDidMount = () => {
    document.title = "Globalstar Innovative Information Technology";

    this.script_paths.map((script_path) => this.append_script(script_path));
  };

  render = () => {
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
              <Route index element={<Index />} />
              <Route path="courses" element={<Courses />} />
              <Route path="contact_us" element={<Contact />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot_password" element={<Forgot_password />} />
              <Route path="about" element={<About />} />
              <Route path="adminstrator" element={<Adminstrator />} />
              <Route path="*" element={<Page_not_found />} />
            </Routes>
          </BrowserRouter>
        </body>
      </html>
    );
  };
}

export default Giit;
