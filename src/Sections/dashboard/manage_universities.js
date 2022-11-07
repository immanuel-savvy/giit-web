import React from "react";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_universities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage universities" />
        <div class="row"></div>
      </div>
    );
  }
}

export default Manage_universities;
