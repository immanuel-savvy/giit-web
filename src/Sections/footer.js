import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import Loadindicator from "../Components/loadindicator";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { total_length: 1 };
  }

  componentDidMount = async () => {
    let courses_categories = new Array(
      {
        name: "development",
        created: Date.now(),
      },
      {
        name: "web designing",
        created: Date.now(),
      },
      {
        name: "networking",
        created: Date.now(),
      },
      {
        name: "cybersecurity",
        created: Date.now(),
      },
      {
        name: "graphic design",
        created: Date.now(),
      },
      {
        name: "digital marketing",
        created: Date.now(),
      }
    );
    this.setState({
      courses_categories: new Array(
        courses_categories.slice(0, 4),
        courses_categories.slice(4)
      ),
      total_length: courses_categories.length,
    });
  };

  render() {
    let { courses_categories, total_length } = this.state;

    return (
      <footer className="dark-footer skin-dark-footer style-2">
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5">
                <div className="footer_widget">
                  <img
                    src={`http://localhost:3000/Assets/img/logo.png`}
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
                        className="form-control"
                        placeholder="Email Address"
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="input-group-text theme-bg b-0 text-light"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-7 ml-auto">
                <div className="row">
                  {total_length ? (
                    <div className="col-lg-8 col-md-8">
                      <div className="footer_widget">
                        <h4 className="widget_title">Courses Categories</h4>
                        {courses_categories ? (
                          <div className="row">
                            <div
                              className={`col-lg-${
                                courses_categories[1] ? "6" : "8"
                              } col-sm-${
                                courses_categories[1] ? "6" : "8"
                              } col-md-7 ml-right`}
                            >
                              <ul className="footer-menu">
                                {courses_categories[0].map((category) => (
                                  <li>
                                    <Link
                                      to={
                                        "/courses?category=" +
                                        `${
                                          category.name === "home"
                                            ? "/"
                                            : category.name.replace(/ /g, "_")
                                        }`
                                      }
                                    >
                                      {to_title(category.name)}
                                      {category.created +
                                        60 * 60 * 24 * 30 * 1000 >
                                      Date.now() ? (
                                        <span className="new">New</span>
                                      ) : null}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {courses_categories[1].length ? (
                              <div className="col-lg-4 col-md-7 col-sm-4 ml-right">
                                <ul className="footer-menu">
                                  {courses_categories[1].map((category) => (
                                    <li>
                                      <Link
                                        to={
                                          "/courses?category=" +
                                          `${
                                            category.name === "home"
                                              ? "/"
                                              : category.name.replace(/ /g, "_")
                                          }`
                                        }
                                      >
                                        {to_title(category.name)}
                                        {category.created +
                                          60 * 60 * 24 * 30 * 1000 >
                                        Date.now() ? (
                                          <span className="new">New</span>
                                        ) : null}
                                      </Link>
                                    </li>
                                  ))}
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
              <div className="col-lg-12 col-md-12 text-center">
                <p className="mb-0">
                  © 2022 GIIT Africa. Designed By
                  <a href="https://github.com/immanuel-savvy"> Savvy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
