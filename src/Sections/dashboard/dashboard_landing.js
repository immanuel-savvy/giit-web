import React from "react";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Course_sections from "./dashboard_course_sections";
import Dashboard_stats from "./dashboard_stats";
import Notifications from "./notifications";

class Dashboard_landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="dashboard" />

        <Dashboard_stats />

        <div class="row">
          <div class="col-lg-8 col-md-12 col-sm-12">
            <Course_sections />
          </div>

          <Notifications />
        </div>
      </div>
    );
  }
}

export default Dashboard_landing;
