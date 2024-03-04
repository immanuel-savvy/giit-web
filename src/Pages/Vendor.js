import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Header from "../Sections/header";
import Student_reviews from "../Sections/student_reviews";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Preview_image from "../Components/preview_image";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Img_tag } from "./Article";

class Vendor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let path = window.location.pathname.split("/").slice(-1)[0];

    let vendor = await get_request(`vendor/${path}`);

    this.setState({ vendor });
  };

  render() {
    let { vendor } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="vendor" refs="header" />
        <div className="clearfix"></div>
        <Breadcrumb page_title={vendor && vendor.title} page_text="About " />

        {vendor ? (
          <section>
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 mb-3">
                  <div className="lmp_caption">
                    <span className="theme-cl">About</span>
                    {/* <h2 className="mb-3">{vendor.title}</h2> */}
                    {vendor.description.split("\n").map((text, index) => (
                      <ReactMarkdown
                        children={text}
                        key={index}
                        components={{
                          img: Img_tag,
                        }}
                      />
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
                    <Preview_image
                      image={vendor.icon}
                      image_hash={vendor.image_hash}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Loadindicator />
        )}

        <Student_reviews />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Vendor;
