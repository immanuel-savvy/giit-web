import React from "react";
import { Link } from "react-router-dom";
import { email_regex, to_title } from "../Assets/js/utils/functions";
import { domain, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Socials from "../Components/socials";
import { Footer_context } from "../Contexts";
import { emitter } from "../Giit";
import Category_breadcrumb from "./category_breadcrumb";

const get_session = (key) => {
  let value = window.sessionStorage.getItem(key);

  try {
    value = JSON.parse(value);
  } catch (e) {}

  return value;
};
const scroll_to_top = () => window.scrollTo({ top: 0, behavior: "smooth" });

const go_back = () => window.history.go(-1);

const save_to_session = (key, value) =>
  window.sessionStorage.setItem(key, JSON.stringify(value));

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { total_length: 1 };
  }

  componentDidMount = async () => {};

  handle_course = (course) => {
    window.sessionStorage.setItem("course", JSON.stringify(course));
    emitter.emit("push_course", course);
    scroll_to_top();
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
    let { lock } = this.props;
    let { total_length, subscribing, subscribed, email } = this.state;

    return (
      <Footer_context.Consumer>
        {({ master_courses: master_courses_ }) => {
          let master_courses = master_courses_
            ? new Array(...master_courses_)
            : null;
          if (master_courses && master_courses.length) {
            if (master_courses.slice(-1)[0].view_all)
              master_courses = master_courses.slice(0, -1);

            total_length = master_courses.length;
            master_courses = new Array(
              master_courses.slice(0, 4),
              master_courses.slice(4)
            );
          }

          return (
            <span>
              {lock ? <div style={{ height: 300 }}></div> : null}
              <footer className="dark-footer skin-dark-footer style-2">
                {lock ? null : (
                  <div className="footer-middle">
                    <Socials />
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-5 col-md-5">
                          <div className="footer_widget">
                            <Link to="/">
                              <img
                                onClick={scroll_to_top}
                                src={`${domain}/Images/giit_africa_logo_white.png`}
                                className="img-footer small mb-2"
                                alt=""
                              />
                            </Link>
                            <h4 className="extream mb-3">
                              Do you need help with
                              <br />
                              anything?
                            </h4>
                            <p>
                              Receive updates, hot deals, tutorials, discounts
                              sent straight in your inbox every week
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
                              {subscribed ? (
                                <p>Email subscribed to newsletter!</p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-7 ml-auto">
                          <div className="row">
                            {total_length ? (
                              <div className="col-lg-8 col-md-8">
                                <div className="footer_widget">
                                  <h4 className="widget_title">
                                    Master Courses
                                  </h4>
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
                                          {master_courses[0] &&
                                          master_courses[0].map
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
                                                          60 *
                                                            60 *
                                                            24 *
                                                            7 *
                                                            1000 >
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
                                      {master_courses[1] &&
                                      master_courses[1].length ? (
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
                                                            60 *
                                                              60 *
                                                              24 *
                                                              7 *
                                                              1000 >
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
                                    <Link onClick={scroll_to_top} to="/">
                                      Home
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={scroll_to_top} to="/about">
                                      About
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={scroll_to_top} to="/blog">
                                      Blog
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      onClick={scroll_to_top}
                                      to="/testimonials"
                                    >
                                      Testimonials
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      onClick={scroll_to_top}
                                      to="/contact_us"
                                    >
                                      Contact
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={scroll_to_top} to="/login">
                                      Login
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="footer-bottom">
                  <div className="container">
                    <div className="row align-items-center">
                      <div
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="col-lg-12 col-md-12 text-center"
                      >
                        <p className="mb-0">
                          © {new Date().getFullYear()} GIIT Africa. All rights
                          reserved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  id="back2Top"
                  className="top-scroll"
                  title="Back to top"
                  href="#"
                >
                  <i className="ti-arrow-up"></i>
                </a>
              </footer>
            </span>
          );
        }}
      </Footer_context.Consumer>
    );
  }
}

export default Footer;
export { save_to_session, scroll_to_top, go_back, get_session };
