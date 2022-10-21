import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Services from "../Sections/services";
import Student_reviews from "../Sections/student_reviews";
import Trusted_by from "../Sections/trusted_by";
import Head from "next/head";

class Careers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    document.title = "Careers | Globalstar Innovative Information Technology";

    this.refs?.header?.forceUpdate();
  };

  render() {
    let { navs } = this.props;

    return (
      <div id="main-wrapper">
        <Header page="Careers" refs="header" />
        <div className="clearfix"></div>
        <Breadcrumb page_title="Who we are?" page_text="Careers" />

        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Careers;
