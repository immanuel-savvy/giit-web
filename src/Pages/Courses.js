import React from "react";
import { get_request, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { organisation_name } from "../Constants/constants";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Featured_course from "../Sections/course";
import Courses_sidebar from "../Sections/courses_sidebar";
import Couses_tabbar from "../Sections/courses_tabbar";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Courses | ${organisation_name}`;

    let query = window.location.search;
    let courses = await post_request("courses");

    this.setState({ courses });
  };

  render = () => {
    let { navs } = this.props;
    let { courses } = this.state;

    return (
      <div id="main-wrapper">
        <Header navs={navs} page="courses" />
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
                <div class="row justify-content-center">
                  {courses ? (
                    courses.length ? (
                      courses.map((course) => (
                        <Featured_course
                          in_courses
                          course={course}
                          key={course._id}
                        />
                      ))
                    ) : null
                  ) : (
                    <Loadindicator contained />
                  )}
                </div>
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
