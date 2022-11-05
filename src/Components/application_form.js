import React from "react";
import { to_title } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "./loadindicator";

class Application_form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  set_cv = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    this.setState({ cv_loading: true });
    reader.onloadend = async (e) =>
      this.setState({
        cv: reader.result,
        file_name: file.name,
        cv_loading: false,
      });
  };

  componentWillUnmount = () => {
    clearTimeout(this.remove_applied_feedback);
  };

  set_applied_remove = () => {
    this.remove_applied_feedback = setTimeout(
      () => this.setState({ applied: false }),
      10000
    );
  };

  apply = async (e) => {
    e.preventDefault();

    let { firstname, linked_in, lastname, file_name, email, cv } = this.state;
    let { vacancy } = this.props;

    this.setState({ posting: true });

    let application = {
      firstname,
      cv_name: file_name,
      lastname,
      email,
      linked_in,
      cv,
      vacancy: vacancy._id,
    };

    await post_request("apply_to_vacancy", application);
    this.setState(
      {
        posting: false,
        applied: true,
        firstname: "",
        lastname: "",
        email: "",
        cv: null,
      },
      this.set_applied_remove
    );
  };

  render() {
    let { vacancy } = this.props;
    let {
      email,
      firstname,
      file_name,
      cv_loading,
      cv,
      linked_in,
      applied,
      lastname,
      posting,
    } = this.state;

    return (
      <div>
        <div class="edu_wraper">
          <h4 class="edu_title">Submit Application</h4>
          <div class="review-form-box form-submit">
            <form>
              <div class="row">
                <div class="form-group smalls">
                  {applied ? (
                    <div className="alert alert-success" role="alert">
                      {`You have successfully applied to job listing - ${to_title(
                        vacancy.title
                      )}. You will receive feedback shortly.`}
                    </div>
                  ) : null}
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Firstname*</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Your Firstname"
                      onChange={({ target }) =>
                        this.setState({ firstname: target.value })
                      }
                      value={firstname}
                      autoFocus
                    />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Lastname*</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Your Lastname"
                      onChange={({ target }) =>
                        this.setState({ lastname: target.value })
                      }
                      value={lastname}
                    />
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group">
                    <label>Email*</label>
                    <input
                      class="form-control"
                      type="email"
                      placeholder="Your Email"
                      onChange={({ target }) =>
                        this.setState({ email: target.value })
                      }
                      value={email}
                    />
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group">
                    <label>Linked In</label>
                    <input
                      class="form-control"
                      type="url"
                      placeholder="Your Email"
                      onChange={({ target }) =>
                        this.setState({ linked_in: target.value })
                      }
                      value={linked_in}
                    />
                  </div>
                </div>

                <div class="form-group smalls">
                  <label>CV*</label>
                  {cv_loading ? (
                    <Loadindicator />
                  ) : (
                    <span>
                      <div className="custom-file">
                        <input
                          className="custom-file-input"
                          id="customFile"
                          type="file"
                          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={this.set_cv}
                        />
                        <label className="custom-file-label" for="customFile">
                          {file_name || "Upload Curriculum Vitae"}
                        </label>
                      </div>
                    </span>
                  )}
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    {posting ? (
                      <Loadindicator />
                    ) : (
                      <a
                        href="#"
                        style={{ color: "#fff" }}
                        onClick={
                          firstname && cv && lastname && email && this.apply
                        }
                        class="btn theme-bg btn-md"
                      >
                        Submit Application
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Application_form;
