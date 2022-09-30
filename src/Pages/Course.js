import React from "react";
import Loadindicator from "../Components/loadindicator";
import Contact_us_today from "../Sections/contact_us_today";
import Course_banner from "../Sections/course_banner";
import Course_details from "../Sections/course_details";
import Course_reviews from "../Sections/course_reviews";
import Course_sidebar from "../Sections/course_sidebar";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Nav from "../Sections/nav";

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let course = window.sessionStorage.getItem("course");
    if (course) {
      course = JSON.parse(course);
      console.log(course);
      this.setState({ course });
    }
  };

  render() {
    let { navs } = this.props;
    let { course } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="course" navs={navs} />
        <div class="clearfix"></div>

        {!course ? (
          <Loadindicator contained />
        ) : (
          <div>
            <Course_banner course={course} />
            <section class="gray pt-3">
              <div class="container">
                <div class="row justify-content-between">
                  <Course_details course={course} />
                  <Course_sidebar course={course} />
                </div>
              </div>
            </section>
          </div>
        )}
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Course;
