import React from "react";
import { Link } from "react-router-dom";
import { email_regex, to_title } from "../Assets/js/utils/functions";
import { get_request, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { total_length: 1 };
  }

  componentDidMount = async () => {
    let master_courses = await get_request("master_courses/all");

    this.setState({
      master_courses: new Array(
        master_courses.slice(0, 4),
        master_courses.slice(4)
      ),
      total_length: master_courses.length,
    });
  };

  handle_course = (course) => {
    window.sessionStorage.setItem("course", JSON.stringify(course));
    emitter.emit("push_course", course);
  };

  set_email_subscription = ({ target }) =>
    this.setState({ email: target.value });

  subscribe_newsletter = async () => {
    let { email, subscribing } = this.state;
    if (!email || (email && !email_regex.test(email)) || subscribing) return;

    this.setState({ subscribing: true });

    await post_request("subscribe_newsletter", { email });
    this.setState({ subscribing: false, subscribed: true });
  };

  render() {
    let { master_courses, total_length, subscribing, subscribed, email } =
      this.state;

    return (
      <footer className="dark-footer skin-dark-footer style-2">
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5">
                <div className="footer_widget">
                  <img
                    src="../Assets/img/logo.png"
                    className="img-footer small mb-2"
                    alt=""
                  />
                  <h4 className="extream mb-3">
                    Do you need help with
                    <br />
                    anything?
                  </h4>
                  <p>
                    Receive updates, hot deals, tutorials, discounts sent
                    straight in your inbox every month
                  </p>
                  <div className="foot-news-last">
                    <div className="input-group">
                      <input
                        type="text"
                        value={email}
                        disabled={!!subscribed}
                        className="form-control"
                        placeholder="Email Address"
                        onChange={this.set_email_subscription}
                      />
                      <div className="input-group-append">
                        {subscribing ? (
                          <Loadindicator />
                        ) : (
                          <button
                            type="button"
                            onClick={this.subscribe_newsletter}
                            className="input-group-text theme-bg b-0 text-light"
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                    </div>
                    {subscribed ? <p>Email subscribed to newsletter!</p> : null}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-7 ml-auto">
                <div className="row">
                  {total_length ? (
                    <div className="col-lg-8 col-md-8">
                      <div className="footer_widget">
                        <h4 className="widget_title">Master Courses</h4>
                        {master_courses ? (
                          <div className="row">
                            <div
                              className={`col-lg-${
                                master_courses[1] ? "6" : "8"
                              } col-sm-${
                                master_courses[1] ? "6" : "8"
                              } col-md-7 ml-right`}
                            >
                              <ul className="footer-menu">
                                {master_courses[0].map
                                  ? master_courses[0].map(
                                      (master_course, index) => (
                                        <li key={index}>
                                          <Link
                                            to="/course"
                                            style={{
                                              flexWrap: "wrap",
                                              display: "flex",
                                            }}
                                          >
                                            <span
                                              onClick={() =>
                                                this.handle_course(
                                                  master_course
                                                )
                                              }
                                            >
                                              {to_title(
                                                master_course.title.replace(
                                                  /_/g,
                                                  " "
                                                )
                                              )}
                                              {master_course.created +
                                                60 * 60 * 24 * 30 * 1000 >
                                              Date.now() ? (
                                                <span className="new">New</span>
                                              ) : null}
                                            </span>
                                          </Link>
                                        </li>
                                      )
                                    )
                                  : null}
                              </ul>
                            </div>
                            {master_courses[1].length ? (
                              <div className="col-lg-4 col-md-7 col-sm-4 ml-right">
                                <ul className="footer-menu">
                                  {master_courses[1].map
                                    ? master_courses[1].map(
                                        (master_course, index) => (
                                          <li key={index}>
                                            <Link
                                              to="/course"
                                              style={{
                                                flexWrap: "wrap",
                                                display: "flex",
                                              }}
                                            >
                                              <span
                                                onClick={() =>
                                                  this.handle_course(
                                                    master_course
                                                  )
                                                }
                                              >
                                                {to_title(
                                                  master_course.title
                                                ).replace(/_/g, " ")}
                                                {master_course.created +
                                                  60 * 60 * 24 * 30 * 1000 >
                                                Date.now() ? (
                                                  <span className="new">
                                                    New
                                                  </span>
                                                ) : null}
                                              </span>
                                            </Link>
                                          </li>
                                        )
                                      )
                                    : null}
                                </ul>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <Loadindicator />
                        )}
                      </div>
                    </div>
                  ) : null}

                  <div className="col-lg-4 col-md-4">
                    <div className="footer_widget">
                      <h4 className="widget_title">Company</h4>
                      <ul className="footer-menu">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/about">About</Link>
                        </li>
                        <li>
                          <Link to="/blog">Blog</Link>
                        </li>
                        <li>
                          <Link to="/affliates">Affliates</Link>
                        </li>
                        <li>
                          <Link to="/contact_us">Contact</Link>
                        </li>
                        <li>
                          <Link to="/login">Login</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <Link to="/adminstrator">
                <div
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="col-lg-12 col-md-12 text-center"
                >
                  <p className="mb-0">
                    © 2022 GIIT Africa. All rights reserved.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <a id="back2Top" className="top-scroll" title="Back to top" href="#">
          <i className="ti-arrow-up"></i>
        </a>
      </footer>
    );
  }
}

export default Footer;
