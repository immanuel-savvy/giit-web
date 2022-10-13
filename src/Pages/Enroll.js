import React from "react";
import { email_regex } from "../Assets/js/utils/functions";
import Breadcrumb from "../Sections/breadcrumb";
import Featured_course from "../Sections/course";
import Header from "../Sections/header";

class Enroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let course = window.sessionStorage.getItem("enroll");
    if (!course) window.history.back();

    try {
      course = JSON.parse(course);
    } catch (e) {
      window.history.back();
    }

    this.setState({ course });
  };

  _is_set = () => {
    let { email, firstname, lastname } = this.state;

    return email_regex.test(email) && firstname && lastname;
  };

  render() {
    let { navs } = this.props;
    let { email, firstname, lastname, course } = this.state;

    return (
      <div id="main-wrapper">
        <Header navs={navs} page="enroll" />
        <div className="clearfix"></div>
        <Breadcrumb page_title="Online Registration" page_text="Enroll" />

        <section>
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12">
                <form>
                  <div class="row">
                    <h5>Enrollment Form</h5>
                    <br />
                    <div class="col-lg-6 col-md-6 col-sm-12">
                      <div class="form-group">
                        <label>Name</label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Your Name"
                          onChange={({ target }) =>
                            this.setState({ firstname: target.value })
                          }
                          value={firstname}
                        />
                      </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-12">
                      <div class="form-group">
                        <label>Lastname*</label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Lastname"
                          onChange={({ target }) =>
                            this.setState({ lastname: target.value })
                          }
                          value={lastname}
                        />
                      </div>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group smalls">
                        <label>Email*</label>
                        <input
                          type="email"
                          className="form-control"
                          onChange={({ target }) =>
                            this.setState({ email: target.value })
                          }
                          value={email}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group smalls">
                    <button
                      onClick={this._is_set() && this.sumbit}
                      type="button"
                      className={`btn full-width ${
                        this._is_set() ? "theme-bg" : "grey"
                      } short_description-white`}
                    >
                      Proceed to payment
                    </button>
                  </div>
                </form>
              </div>
              <Featured_course
                adminstrator
                classname="col-xl-4 col-lg-4 col-md-5 col-sm-12 mb-3"
                course={course}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Enroll;
