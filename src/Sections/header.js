import React from "react";
import Nav from "./nav";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="header header-transparent dark-text">
        <div className="container">
          <Nav />
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default Header;
