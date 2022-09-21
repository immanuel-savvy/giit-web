import React from "react";
import { Link } from "react-router-dom";

class Dashboard_breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
        </div>
      </div>
    );
  }
}

export default Dashboard_breadcrumb;
