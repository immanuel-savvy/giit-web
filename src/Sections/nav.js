import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navs: new Array(
        {
          title: "home",
          path: "/",
        },
        {
          title: "courses",
          path: "/courses",
        },
        {
          title: "contact",
          path: "/contact",
        }
      ),
    };
  }

  render() {
    let { navs, active_nav } = this.state;

    return (
      <nav id="navigation" className="navigation navigation-landscape">
        <div className="nav-header">
          <Link className="nav-brand" to="/">
            <img
              src={require("../Assets/img/logo.png")}
              className="logo"
              alt=""
            />
          </Link>
          <div className="nav-toggle"></div>
          {/* <div className="mobile_nav">
            <ul>
              <li>
                <Link
                  to="javascript:void(0);"
                  data-toggle="modal"
                  data-target="#login"
                  className="crs_yuo12 w-auto text-white theme-bg"
                >
                  <span className="embos_45">
                    <i className="fas fa-sign-in-alt mr-1"></i>Sign In
                  </span>
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="nav-menus-wrapper">
          <ul className="nav-menu">
            {navs
              ? navs.map((nav, index) => {
                  return (
                    <li
                      key={index}
                      className={active_nav === nav.to ? "active" : ""}
                    >
                      <Link to={nav.path} key={nav.title}>
                        {to_title(nav.title)}
                        {nav.submenu ? (
                          <span className="submenu-indicator"></span>
                        ) : null}
                      </Link>
                      {nav.submenu ? (
                        <ul className="nav-dropdown nav-submenu">
                          {nav.submenu.map((submenu) => (
                            <li>
                              <Link key={submenu.title} to={submenu.path}>
                                {submenu.title}
                              </Link>
                              {submenu.submenu ? (
                                <span className="submenu-indicator"></span>
                              ) : null}
                              {submenu.submenu ? (
                                <ul className="nav-dropdown nav-submenu">
                                  {submenu.submenu
                                    ? submenu.submenu.map((item, index) => (
                                        <li key={index}>
                                          <Link href={item.path}>
                                            {item.title}
                                          </Link>
                                        </li>
                                      ))
                                    : null}
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
      </nav>
    );
  }
}

export default Nav;
