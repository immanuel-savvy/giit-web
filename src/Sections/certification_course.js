import React from "react";
import { to_title } from "../Assets/js/utils/functions";

class Certification_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { certification } = this.props;
    let { title } = certification;

    return (
      <div className="single_items lios_item mb-3 col-md-4">
        <div className="_testimonial_wrios shadow_none">
          <div className="_testimonial_flex">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "200px" }}
            >
              <p style={{ color: "#0a85d9" }} className="text-center h3">
                {to_title(title)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Certification_course;
