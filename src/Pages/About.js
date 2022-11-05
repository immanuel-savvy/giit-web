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

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    document.title = "About | Globalstar Innovative Information Technology";
  };

  render() {
    let { navs } = this.props;

    return (
      <div id="main-wrapper">
        <Header navs={navs} page="about" refs="header" />
        <div className="clearfix"></div>
        <Breadcrumb page_title="Who we are?" page_text="About Us" />

        <section>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 mb-3">
                <div className="lmp_caption">
                  <span className="theme-cl">About Us</span>
                  <h2 className="mb-3">What We Do & Our Aim</h2>
                  <p>
                    GIIT is a global leader delivering a wide range of
                    management and technical training. We are a trusted training
                    delivery partner of 350+ corporate clients and universities
                    across the globe with 50,000+ professionals trained across
                    various courses. GIIT helps individuals and organizations by
                    providing courses based on practical knowledge and
                    theoretical concepts. Our industry reputation speaks for
                    itself.
                  </p>
                  <p>
                    We offer the best value in training services combined with
                    the support of our creative minds to establish a solution
                    that suits your learning needs. We help in building careers
                    and shaping up the future leaders.
                  </p>
                  <br />

                  <div className="text-left mt-4">
                    <Link
                      to="/courses"
                      className="btn btn-md text-light theme-bg"
                    >
                      Enrolled Today
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
