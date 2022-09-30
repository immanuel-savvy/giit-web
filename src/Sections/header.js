import React from "react";
import Nav from "./nav";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { page, navs } = this.props;

    return (
      <div
        className={
          page === "home" || !page
            ? "header header-transparent dark-text my_header_style_init"
            : "header header-light head-shadow my_header_style_init"
        }
      >
        <div className="container">
          <Nav navs={navs} />
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default Header;
