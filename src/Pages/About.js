import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Services from "../Sections/services";
import Student_reviews from "../Sections/student_reviews";
import Trusted_by from "../Sections/trusted_by";
import Head from "next/head";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  script_paths = new Array(
    "../Assets/js/jquery.min.js",
    "../Assets/js/popper.min.js",
    "../Assets/js/bootstrap.min.js",
    "../Assets/js/select2.min.js",
    "../Assets/js/slick.js",
    "../Assets/js/moment.min.js",
    "../Assets/js/daterangepicker.js",
    "../Assets/js/summernote.min.js",
    "../Assets/js/metisMenu.min.js",
    "../Assets/js/custom.js"
  );

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = path;
    // script.async = true;
    document.getElementById("main-wrapper").appendChild(script);
  };

  componentDidMount = () => {
    document.title = "About | Globalstar Innovative Information Technology";

    // this.script_paths.map((script_path) => this.append_script(script_path));
  };

  render() {
    return (
      <div id="main-wrapper">
        <Header page="about" />
        <div className="clearfix"></div>
        <Breadcrumb page_title="Who we are?" page_text="About Us" />

        <section>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
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
                  <h6>Our Core Values</h6>
                  <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                        <i className="fas fa-check"></i>
                      </div>
                      <h6 className="mb-0 ml-3">Integrity</h6>
                    </div>
                  </div>
                  <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                        <i className="fas fa-check"></i>
                      </div>
                      <h6 className="mb-0 ml-3">Responsibility</h6>
                    </div>
                  </div>
                  <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                        <i className="fas fa-check"></i>
                      </div>
                      <h6 className="mb-0 ml-3">Diligence</h6>
                    </div>
                  </div>
                  <div className="text-left mt-4">
                    <a href="#" className="btn btn-md text-light theme-bg">
                      Enrolled Today
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                <div className="lmp_thumb">
                  <img
                    src="http://localhost:3000/Assets/img/logo.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Services />
        <Trusted_by />
        <Student_reviews />
        <Contact_us_today />
        <Footer />

        <Head>
          {this.script_paths.map((path) => (
            <script scr={path}></script>
          ))}
        </Head>
      </div>
    );
  }
}

export default About;
