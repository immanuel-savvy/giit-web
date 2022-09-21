import React from "react";
import Contact_us_today from "../Sections/contact_us_today";
import Dashboard_landing from "../Sections/dashboard_landing";
import Dashboard_navbar from "../Sections/dashboard_navbar";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Adminstrator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
  };

  render() {
    return (
      <div id="main-wrapper">
        <Header page="dashboard" />
        <div class="clearfix"></div>
        <section class="gray pt-4">
          <div class="container-fluid">
            <div class="row">
              <Dashboard_navbar />
              <Dashboard_landing />
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
