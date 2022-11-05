import React from "react";
import { to_title } from "../Assets/js/utils/functions";
import { domain } from "../Constants/constants";
import Applicants from "./applicants";
import Modal from "./modal";

class Vacancy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_applicants = () =>
    this.setState({ show_applicants: !this.state.show_applicants });

  toggle_application_form = () =>
    this.setState({ show_application_form: !this.state.show_application_form });

  render() {
    let { vacancy, apply, in_application, remove, edit } = this.props;
    let {
      title,
      description,
      applicants: number_of_applicants,
      job_profile,
      image,
      part_time,
      _id,
    } = vacancy;

    return (
      <>
        <tr key={_id}>
          <td>
            <div className="crs_cate_icon">
              <img src={`${domain}/Images/${image}`} className="img-fluid" />
            </div>
          </td>
          <td>
            <h6>{to_title(title)}</h6>
          </td>
          <td>
            <div className="dhs_tags">{description.slice(0, 20)}...</div>
          </td>
          <td>
            <div className="dhs_tags">
              {part_time ? "Part-Time" : "Fulltime"}
            </div>
          </td>
          {in_application ? null : (
            <td>
              <div className="dhs_tags">
                {remove ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => this.modal?.toggle()}
                    className="btn theme-bg text-light"
                  >
                    {`Applicants (${number_of_applicants || 0})`}
                  </span>
                ) : job_profile ? (
                  <a
                    href={job_profile}
                    target="_blank"
                    className="btn theme-bg text-light"
                  >
                    Job Profile
                  </a>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={apply}
                    className="btn theme-bg text-light"
                  >
                    Apply
                  </span>
                )}
              </div>
            </td>
          )}
          {remove ? (
            <td>
              <div className="dhs_tags">
                <a onClick={() => edit()} className="btn btn-action">
                  <i className={`fas fa-edit`}></i>
                </a>

                <a
                  onClick={() => window.confirm("Remove vacancy?") && remove()}
                  className="btn btn-action"
                >
                  <i className={`fas fa-window-close`}></i>
                </a>
              </div>
            </td>
          ) : null}
        </tr>

        <Modal
          size="lg"
          backdrop="static"
          keyboard={false}
          ref={(modal) => (this.modal = modal)}
          title={`Applicants: ${to_title(title)}`}
        >
          <Applicants vacancy={vacancy} />
        </Modal>
      </>
    );
  }
}

export default Vacancy;
