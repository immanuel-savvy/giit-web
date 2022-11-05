import React from "react";
import { to_title } from "../Assets/js/utils/functions";
import { domain } from "../Constants/constants";

class Applicant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { applicant } = this.props;
    let { created, firstname, lastname, linked_in, email, cv, cv_name } =
      applicant;
    let date = new Date(created);

    return (
      <tr>
        <td>
          <div className="dhs_tags">
            {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </div>
        </td>
        <td>
          <a href={linked_in} target="_blank">
            <h6 style={{ color: "#000" }}>
              {to_title(`${firstname} ${lastname}`.trim())}
            </h6>
          </a>
        </td>
        <td>
          <div className="dhs_tags">{email}</div>
        </td>
        <td>
          <a href={`${domain}/Files/${cv}`} target="_blank">
            <h6>View</h6>
          </a>
        </td>
      </tr>
    );
  }
}

export default Applicant;
