import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../../Assets/js/utils/functions";

class Dashboard_breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { crumb } = this.props;

    return (
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link style={{ color: "#ff6905" }} to="/">
                  Home
                </Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {to_title(crumb)}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    );
  }
}

export default Dashboard_breadcrumb;
