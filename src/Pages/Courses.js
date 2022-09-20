import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Courses_sidebar from "../Sections/courses_sidebar";
import Couses_tabbar from "../Sections/courses_tabbar";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render = () => {
    return (
      <div id="main-wrapper">
        <Header page="courses" />
        <Breadcrumb page_title="Courses" page_text="Find Courses" />
        <section class="gray">
          <div class="container">
            <div class="row">
              <Courses_sidebar
                ref={(courses_sidebar) =>
                  (this.courses_sidebar = courses_sidebar)
                }
              />
              <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <Couses_tabbar />
              </div>
            </div>
          </div>
        </section>
        <Contact_us_today />
        <Footer />
      </div>
    );
  };
}

export default Courses;
