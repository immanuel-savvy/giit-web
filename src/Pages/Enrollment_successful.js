import React from "react";
import Header from "../Sections/header";
import { Link } from "react-router-dom";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import { get_request } from "../Assets/js/utils/services";
import { go_back } from "../Sections/footer";
import Loadindicator from "../Components/loadindicator";
import Preview_image from "../Components/preview_image";
import { Logged_user } from "../Contexts";

class Enrollment_successful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let enrollment_id = window.location.href.split("/").slice(-1)[0];
    let enrollment = await get_request(`enrollment/${enrollment_id}`);

    if (!enrollment) return go_back();

    this.setState({ enrollment });
  };

  render = () => {
    let { enrollment } = this.state;

    return (
      <Logged_user.Consumer>
        {({ loggeduser }) => {
          return (
            <div className="main-wrapper">
              <Header page="404" />
              <div class="clearfix"></div>
              <section class="error-wrap">
                <div class="container">
                  <div class="row justify-content-center">
                    {enrollment ? (
                      <div class="col-lg-6 col-md-10">
                        <div class="text-center">
                          <Preview_image
                            image={enrollment.course.image}
                            class_name="img-fluid rounded"
                            alt=""
                          />
                          <p
                            className="lead"
                            style={{ fontWeight: "bold", marginTop: 20 }}
                          >
                            "Success! You're officially signed up for the{" "}
                            <span className="theme-cl">
                              {enrollment.course.title.replace(/_/g, " ")}
                            </span>{" "}
                            course."
                          </p>
                          {
                            <Link
                              to={loggeduser ? "/dashboard" : "/login"}
                              class="btn theme-bg text-white btn-md"
                            >
                              {loggeduser
                                ? "Go to Profile"
                                : "Login to Profile"}
                            </Link>
                          }
                        </div>
                      </div>
                    ) : (
                      <Loadindicator contained />
                    )}
                  </div>
                </div>
              </section>
              <Contact_us_today />
              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  };
}

export default Enrollment_successful;
