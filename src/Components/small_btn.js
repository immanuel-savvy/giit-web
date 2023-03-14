import React from "react";

class Small_btn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { action, title } = this.props;

    return (
      <span onClick={action} className="btn btn-md text-light theme-bg">
        {title}
      </span>
    );
  }
}

export default Small_btn;
