import "./Assets/css/plugins/animation.css";
import "./Assets/css/plugins/bootstrap.min.css";
import "./Assets/css/plugins/date-picker.css";
import "./Assets/css/plugins/select2.css";
import "./Assets/css/plugins/slick.css";
// import "./Assets/css/plugins/slick-theme.css";
import "./Assets/css/plugins/themify.css";
import "./Assets/css/plugins/morris.css";
import "./Assets/css/plugins/font-awesome.css";
import "./Assets/css/plugins/flaticon.css";
import "./Assets/css/plugins/summernote.min.css";
import "./Assets/css/styles.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Home";
import Courses from "./Pages/Courses";

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
    "../Assets/js/custom.js"
  );

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = path;
    script.async = true;
    document.body.appendChild(script);
  };

  componentDidMount = () => {
    document.title = "Globalstart Innovative Information Technology";

    this.script_paths.map((script_path) => this.append_script(script_path));
  };

  render = () => {
    return (
      <BrowserRouter>
        <html lang="zxx">
          <head>
            <meta charSet="utf-8" />
            <meta name="author" content="Themezhub" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="shortcut icon" href="../assets/images/gt_favicon.png" />
          </head>

          <body>
            <Routes>
              <Route index element={<Index />} />
              <Route path="courses" element={<Courses />} />
            </Routes>
            <script>console.log('JSS')</script>
          </body>
        </html>
      </BrowserRouter>
    );
  };
}

export default Giit;
