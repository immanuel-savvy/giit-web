import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import { domain, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { Nav_context } from "../Contexts";

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  mouse_over = async (nav) => await this.set_subnav(nav);

  set_submenu = async () => {
    let { current_subnav } = this.state;

    let current_submenu = null;
    if (!this.state.sub_menus[current_subnav])
      current_submenu = await post_request("/get_courses", {
        courses: this.props.navs.find((course) => course._id === current_subnav)
          .courses,
      });

    this.setState({
      sub_menus: new Object({
        ...this.state.sub_menus,
        [current_subnav]: current_submenu,
      }),
    });
  };

  mouse_out = (nav_id) => {};

  render() {
    let { sub_menus, lock } = this.props;

    return (
      <Nav_context.Consumer>
        {({ navs, subnavs, set_subnav }) => {
          this.set_subnav = set_subnav;

          return (
            <nav id="navigation" className="navigation navigation-landscape">
              <div className="nav-header">
                <Link className="nav-brand" to="/">
                  <img
                    src={`${domain}/Images/giit_africa_logo_white.png`}
                    className="logo"
                    id="logo_white"
                    alt=""
                  />
                  <img
                    src={`${domain}/Images/giit_africa_logo_blue.png`}
                    className="logo"
                    id="logo_blue"
                    style={{ display: "none" }}
                    alt=""
                  />
                </Link>
                <div className="nav-toggle"></div>
                <div className="mobile_nav">
                  <ul>
                    <li>
                      <Link
                        to="/login"
                        className="crs_yuo12 w-auto text-white theme-bg"
                      >
                        <span className="embos_45">
                          <i className="fas fa-sign-in-alt mr-1"></i>Sign In
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {lock ? null : (
                <div className="nav-menus-wrapper">
                  <ul className="nav-menu">
                    {navs
                      ? navs.map((nav, index) => {
                          return (
                            <li key={index}>
                              <Link to={nav.path} key={nav.title}>
                                <span>
                                  {to_title(nav.title.replace(/_/g, " "))}
                                  {nav.submenu ? (
                                    <span className="submenu-indicator"></span>
                                  ) : null}
                                </span>
                              </Link>
                              {nav.submenu ? (
                                <ul className="nav-dropdown nav-submenu">
                                  {nav.submenu.map((submenu, index) => (
                                    <li
                                      key={index}
                                      onMouseOver={() =>
                                        this.mouse_over(submenu)
                                      }
                                    >
                                      <Link to={submenu.path}>
                                        <span onClick={submenu.on_click}>
                                          {submenu.title.replace(/_/g, " ")}
                                        </span>
                                      </Link>
                                      {submenu.submenu ? (
                                        <span className="submenu-indicator"></span>
                                      ) : null}
                                      {submenu.submenu ? (
                                        <ul className="nav-dropdown nav-submenu">
                                          {subnavs[submenu._id] ? (
                                            subnavs[submenu._id]?.length ? (
                                              subnavs[submenu._id].map(
                                                (item, index) => (
                                                  <li
                                                    key={index}
                                                    onClick={item.on_click}
                                                  >
                                                    <Link to={item.path}>
                                                      {item.title}
                                                    </Link>
                                                  </li>
                                                )
                                              )
                                            ) : (
                                              <p className="text-dark">
                                                Nothing here yet.
                                              </p>
                                            )
                                          ) : (
                                            <Loadindicator />
                                          )}
                                        </ul>
                                      ) : null}
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </li>
                          );
                        })
                      : null}
                  </ul>
                  <ul className="nav-menu nav-menu-social align-to-right">
                    <li>
                      <Link
                        to="/login"
                        className="alio_green"
                        data-toggle="modal"
                        data-target="#login"
                      >
                        <i className="fas fa-sign-in-alt mr-1"></i>
                        <span className="dn-lg">Sign In</span>
                      </Link>
                    </li>
                    <li className="add-listing theme-bg">
                      <Link to="/signup" className="text-white">
                        Get Started
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </nav>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Nav;
