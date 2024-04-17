import React from "react";
import Footer, { get_session } from "../Sections/footer";
import Profile_header from "../Components/profile_header";
import { Logged_user } from "../Contexts";
import Header from "../Sections/header";
import Section_header from "../Components/section_headers";
import { get_request } from "../Assets/js/utils/services";
import Featured_course from "../Sections/course";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    if (!this.loggeduser) this.loggeduser = get_session("loggeduser");

    let courses = await get_request(`user_enrollments/${this.loggeduser._id}`);

    this.setState({ courses });
  };

  render() {
    let { courses } = this.state;

    return (
      <Logged_user.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div>
              <Header />
              <div className="clearfix"></div>

              <Profile_header
                loggeduser={loggeduser}
                enrollments={courses?.length}
              />

              <section className="gray">
                <Section_header title="Your Learning" />

                <div className="container">
                  <div className="row">
                    {courses ? (
                      courses.length ? (
                        courses.map((course) => (
                          <Featured_course
                            enrolled={course}
                            course={course?.enrollment?.course}
                            key={course._id}
                          />
                        ))
                      ) : (
                        <Listempty />
                      )
                    ) : (
                      <Loadindicator />
                    )}
                  </div>
                </div>
              </section>

              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  }
}

export default Profile;
