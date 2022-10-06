import React from "react";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Contact_us_today from "../Sections/contact_us_today";
import Featured_course from "../Sections/course";
import Course_banner from "../Sections/course_banner";
import Course_details from "../Sections/course_details";
import Course_sidebar from "../Sections/course_sidebar";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

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

      if (course.courses) {
        let cummulative_price = 0;
        let courses = await post_request("get_courses", {
          courses: course.courses,
        });
        courses.map((c) => (cummulative_price += c.price));

        this.setState({
          courses,
          cummulative_price,
        });
      }
    }
  };

  render() {
    let { navs } = this.props;
    let { course, courses, cummulative_price } = this.state;

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
                  {course.courses ? (
                    <div class="col-lg-8 col-md-12 order-lg-first">
                      <div class="row justify-content-center">
                        {courses ? (
                          courses.map((course_) => (
                            <Featured_course
                              in_courses
                              course={course_}
                              key={course_._id}
                            />
                          ))
                        ) : (
                          <Loadindicator contained />
                        )}
                      </div>
                    </div>
                  ) : (
                    <Course_details course={course} />
                  )}

                  <Course_sidebar
                    course={course}
                    cummulative_price={cummulative_price}
                  />
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
