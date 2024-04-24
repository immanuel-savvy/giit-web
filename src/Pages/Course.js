import React from "react";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";
import Certification_courses from "../Sections/certification_courses";
import Contact_us_today from "../Sections/contact_us_today";
import Featured_course from "../Sections/course";
import Course_banner from "../Sections/course_banner";
import Course_details from "../Sections/course_details";
import Course_sidebar from "../Sections/course_sidebar";
import Footer, { get_session } from "../Sections/footer";
import Header from "../Sections/header";
import Student_reviews from "../Sections/student_reviews";
import { scroll_to_top } from "./Adminstrator";
import Latest_news_and_articles from "../Sections/latest_news_and_articles";
import Upcoming_seminars from "../Sections/upcoming_seminar";
import { organisation_name } from "../Constants/constants";

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetch_course_children = async (course) => {
    let cummulative_price = 0;
    let courses = await post_request("get_courses", {
      courses: course.courses,
    });
    courses.map((c) => (cummulative_price += c.price));

    this.setState({
      courses,
      cummulative_price,
    });
  };

  componentDidMount = async () => {
    let course = get_session("course");
    scroll_to_top();

    if (course) {
      document.title = `${
        course.meta_title || course.title.replace(/_/g, " ")
      } | ${organisation_name}`;

      this.setState({ course });

      if (course.courses) await this.fetch_course_children(course);
    }

    this.push_course = (course) => {
      if (course._id === this.state.course._id) return;
      scroll_to_top();

      this.setState(
        { course },
        async () => await this.fetch_course_children(course)
      );
    };

    emitter.listen("push_course", this.push_course);

    let loggeduser = get_session("loggeduser");
    if (loggeduser && course) {
      let is_enrolled = await post_request("is_enrolled", {
        user: loggeduser._id,
        course: course._id,
        masters: course.master_courses,
      });
      this.setState({ is_enrolled });
    }
  };

  componentWillUnmount = () => {
    emitter.remove_listener("push_course", this.push_course);
  };

  cummulate_certifications = (courses) => {
    if (!this.state.cummulative_price) return;

    let certifications = new Array();

    courses.map(
      (course) =>
        course.certifications && certifications.push(...course.certifications)
    );
    return certifications;
  };

  render() {
    let { navs } = this.props;
    let { course, courses, cummulative_price, is_enrolled } = this.state;

    let certifications = this.cummulate_certifications(courses);

    return (
      <div id="main-wrapper">
        <Header page="course" navs={navs} />
        <div class="clearfix"></div>

        {!course ? (
          <Loadindicator contained />
        ) : (
          <Course_banner course={course} />
        )}

        {!course ? null : (
          <section class="gray pt-3">
            <div class="container">
              <div class="row">
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

                    {certifications ? (
                      <>
                        <h4 class="edu_title">Certifications</h4>
                        <Certification_courses
                          certifications={certifications}
                        />
                      </>
                    ) : null}
                  </div>
                ) : (
                  <Course_details course={course} />
                )}

                <Course_sidebar
                  course={course}
                  is_enrolled={is_enrolled}
                  cummulative_price={cummulative_price}
                />
              </div>
            </div>
          </section>
        )}

        <Upcoming_seminars />

        <Student_reviews />

        <Latest_news_and_articles />

        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Course;
