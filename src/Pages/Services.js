import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Services from "../Sections/services";
import Trusted_by from "../Sections/trusted_by";

class Services_page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="main-wrapper">
        <Header page="services" />
        <Breadcrumb no_gray page_title="What we offer" page_text="Services" />

        <Services />

        <Trusted_by />

        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Services_page;
