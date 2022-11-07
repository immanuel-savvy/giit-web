import React from "react";
import { get_request, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { domain } from "../Constants/constants";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class University_progressions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let stuff = await get_request("university_progression_stuff");
    this.setState({ stuff });

    let universities = await post_request("university_progression");
    this.setState({ universities });
  };

  render() {
    let { stuff, universities } = this.state;
    let { steps, image, title, text } = stuff || new Object();

    return (
      <div id="main-wrapper">
        <Header page="university" />
        <Breadcrumb
          page_title="University Progression"
          page_text="University Progression"
        />

        {stuff ? (
          <>
            <section class="imageblock pt-m-0">
              <div class="imageblock__content">
                <div
                  class="background-image-holder"
                  style={{
                    backgroundImage: `url(${domain}/Images/${image})`,
                  }}
                ></div>
              </div>
              <div class="container">
                <div class="row align-items-center justify-content-between">
                  <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                    <div class="lmp_caption">
                      <h2 class="mb-3">
                        {title ||
                          "How to progress to the university of your choice through us."}
                      </h2>
                      <p>{text}</p>

                      {steps
                        ? steps.map((step, index) => (
                            <div key={index} class="mb-3 mr-4 ml-lg-0 mr-lg-4">
                              <div class="d-flex align-items-center">
                                <div class="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                  <i class="fas fa-check"></i>
                                </div>
                                <h6 class="mb-0 ml-3">{step.title}</h6>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="min">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-7 col-md-8">
                    <div class="sec-heading center">
                      <h2>
                        Affiliated <span class="theme-cl">Universities</span>
                      </h2>
                      <p>
                        Get lastest updates on admissions into the institutes of
                        your choice.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="row justify-content-center"></div>
              </div>
            </section>
          </>
        ) : (
          <Loadindicator contained />
        )}

        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default University_progressions;
