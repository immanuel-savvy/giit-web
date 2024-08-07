import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Services from "../Sections/services";
import Student_reviews from "../Sections/student_reviews";
import Trusted_by from "../Sections/trusted_by";
import Best_instructors from "../Sections/best_instructors";
import { Link } from "react-router-dom";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { organisation_name } from "../Constants/constants";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `About | ${organisation_name}`;

    let about_statement = await get_request("about_statement");
    this.setState({ about_statement });
  };

  render() {
    let { about_statement } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="about" refs="header" />
        <div className="clearfix"></div>
        <Breadcrumb page_title="Who we are?" page_text="About Us" />

        {about_statement && about_statement.text ? (
          <section>
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 mb-3">
                  <div className="lmp_caption">
                    <span className="theme-cl">About Us</span>
                    <h2 className="mb-3">What We Do & Our Aim</h2>
                    {about_statement.text.split("\n").map((text, index) => (
                      <p key={index}>{text}</p>
                    ))}
                    <br />

                    <div className="text-left mt-4">
                      <Link
                        to="/courses"
                        className="btn btn-md text-light theme-bg"
                      >
                        Enroll Today
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
                  <div className="lmp_thumb">
                    <img
                      src="../Assets/img/logo.png"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Loadindicator contained />
        )}

        <Services />
        <Best_instructors />
        <Trusted_by />
        <Student_reviews />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default About;
