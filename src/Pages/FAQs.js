import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Faqs from "../Sections/faqs";
import Header from "../Sections/header";
import Footer from "../Sections/footer";
import Contact_us_today from "../Sections/contact_us_today";

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

        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default FAQS;
