import React from "react";
import Instructor_header from "../Components/instructor_header";
import { Logged_user } from "../Contexts";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import Footer, { scroll_to_top, go_back } from "../Sections/footer";
import Explore_more_btn from "../Sections/explore_more_btn";
import { get_request, post_request } from "../Assets/js/utils/services";
import Contact_us_today from "../Sections/contact_us_today";
import Featured_course from "../Sections/course";
import Header from "../Sections/header";
import Student_reviews from "../Sections/student_reviews";

class Instructor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 25,
      page: 1,
    };
  }

  componentDidMount = async () => {
    scroll_to_top();

    let path = window.location.pathname.split("/");
    if (path.length !== 3) return go_back();

    let instructor = await get_request(`/instructor_uri/${path.slice(-1)[0]}`);

    if (!instructor) return go_back();

    this.setState({ instructor });

    let courses = await post_request("instructor_courses", {
      instructor: instructor._id,
    });

    console.log(courses);
    this.setState({ courses });
  };

  edit_course = () => {};

  remove_course = () => {};

  render() {
    let { instructor, courses, limit, no_new } = this.state;

    return (
      <Logged_user.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Header page="instructor" />

              {instructor ? (
                <>
                  <Instructor_header
                    loggeduser={loggeduser}
                    instructor={instructor}
                  />

                  <section class="gray">
                    <div class="container">
                      <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-8">
                          <div className="sec-heading center">
                            <h2>Courses</h2>
                            {/* <p>{text}</p> */}
                          </div>
                        </div>
                      </div>
                      <div class="row justify-content-center">
                        {courses ? (
                          courses.length ? (
                            courses.map((course) => (
                              <Featured_course
                                course={course.course}
                                in_instructor
                                edit={
                                  instructor.user === loggeduser?._id
                                    ? () => this.edit_course(course)
                                    : null
                                }
                                remove={
                                  instructor.user === loggeduser?._id
                                    ? () => this.remove_course(course)
                                    : null
                                }
                                key={course._id}
                                cols
                              />
                            ))
                          ) : (
                            <Listempty />
                          )
                        ) : (
                          <Loadindicator />
                        )}

                        {no_new ? null : courses && courses.length >= limit ? (
                          <Explore_more_btn text="Load More Courses" />
                        ) : null}
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <Loadindicator />
              )}

              <Student_reviews />

              <Contact_us_today />

              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  }
}

export default Instructor;
