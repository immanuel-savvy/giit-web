import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Faqs from "../Sections/faqs";
import Header from "../Sections/header";

class FAQS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="main-wrapper">
        <Header page="enroll" />
        <div className="clearfix"></div>
        <Breadcrumb page_title="FAQS" page_text="Frequently asked questions" />

        <Faqs paged />
      </div>
    );
  }
}

export default FAQS;
