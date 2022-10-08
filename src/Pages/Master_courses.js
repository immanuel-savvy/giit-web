import React from "react";
import { organisation_name } from "../Constants/constants";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { default as Master_courses_ } from "./../Sections/master_courses";

class Master_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current_page: 1, filter: new Object() };
  }

  componentDidMount = async () => {
    document.title = `Master Courses | ${organisation_name}`;
  };

  render = () => {
    let { navs } = this.props;

    return (
      <div id="main-wrapper">
        <Header navs={navs} page="master courses" />
        <Breadcrumb
          page_title="Master_courses"
          page_text="Find Master_courses"
        />

        <Master_courses_ all />

        <Contact_us_today />
        <Footer />
      </div>
    );
  };
}

export default Master_courses;
