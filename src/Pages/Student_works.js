import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer, { scroll_to_top } from "../Sections/footer";
import Header from "../Sections/header";
import { organisation_name } from "../Constants/constants";
import Student_works from "../Sections/student_works";

class Students_works extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      page_size: 24,
    };
  }

  componentDidMount = async () => {
    scroll_to_top();
    document.title = `Companies | ${organisation_name}`;
  };

  render() {
    return (
      <div id="main-wrapper">
        <Header page="Students" refs="header" />
        <div className="clearfix"></div>
        <Breadcrumb
          page_title="Organisations our Students Works"
          no_gray
          page_text="Students"
        />

        <div style={{ backgroundColor: "#f7f8f9", paddingTop: 20 }}>
          <div className="container">
            <div className="mt-5 row justify-content-center">
              <Student_works all />
            </div>
          </div>
        </div>
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Students_works;
