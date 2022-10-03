import React from "react";
import { post_request } from "../Assets/js/utils/services";
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

    this.state = { current_page: 1, filter: new Object() };
  }

  componentDidMount = async () => {
    document.title = `Courses | ${organisation_name}`;

    let { filter } = this.state;
    let query = window.location.search;
    let params = query.slice(1).split("&");
    params.map((param) => {
      param = param.split("=");
      filter[param[0]] = param[1];
    });

    let { total_courses, courses } = await post_request("courses", {
      filter,
      total_courses: true,
      limit: this.page_size,
    });

    this.setState({ courses, total_courses, filter });
  };

  fetch_courses = async (filter) => {
    this.setState({ fetching_courses: true });
    let { total_courses, courses } = await post_request("courses", {
      filter,
      total_courses: true,
      limit: this.page_size,
    });

    this.setState({ courses, fetching_courses: false, total_courses, filter });
  };

  page_size = 25;

  render = () => {
    let { navs } = this.props;
    let { courses, fetching_courses, total_courses, filter } = this.state;

    return (
      <div id="main-wrapper">
        <Header navs={navs} page="courses" />
        <Breadcrumb page_title="Courses" page_text="Find Courses" />
        <section class="gray">
          <div class="container">
            <div class="row">
              <Courses_sidebar
                section={filter.section}
                category={filter.category}
                fetch_courses={this.fetch_courses}
                ref={(courses_sidebar) =>
                  (this.courses_sidebar = courses_sidebar)
                }
              />
              <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <Couses_tabbar
                  page_size={this.page_size}
                  courses_length={courses && courses.length}
                  total_courses={total_courses || ""}
                />
                <div class="row justify-content-center">
                  {courses && !fetching_courses ? (
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
