import React from "react";

class Loadindicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { height, width } = this.props;

    return (
      <img
        src="http://localhost:3000/Assets/css/plugins/ajax-loader.gif"
        style={{ height: height || 64, width: width || 64 }}
      />
    );
  }
}

export default Loadindicator;
