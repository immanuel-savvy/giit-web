import React from "react";
import { get_request, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import University_progress from "../Components/university_progress";
import { domain } from "../Constants/constants";
import Best_instructors from "../Sections/best_instructors";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Student_reviews from "../Sections/student_reviews";

class University_progressions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let stuff = await get_request("university_progression_stuff");
    this.setState({ stuff });

    let countries = await get_request("countries");
    this.setState({ countries });
  };

  render() {
    let { stuff, countries } = this.state;
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

                      {steps ? (
                        <div class="lmp_caption">
                          <ol class="list-unstyled p-0">
                            {steps.map(({ title, text }, index) => (
                              <li
                                key={index}
                                class="d-flex align-items-start my-3 my-md-4"
                              >
                                <div class="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                  <i class="fas fa-check"></i>
                                </div>
                                <div class="ml-3 ml-md-4">
                                  <h5>{title}</h5>
                                  <p>{text}</p>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ) : null}
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
                        Affiliated Universities by&nbsp;
                        <span class="theme-cl">Countries</span>
                      </h2>
                      <p>
                        Find a university in the country of your choice to
                        further your course.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="row justify-content-center">
                  {countries ? (
                    countries.length ? (
                      countries.map((country) => (
                        <University_progress
                          university_progress={country}
                          key={country._id}
                        />
                      ))
                    ) : null
                  ) : (
                    <Loadindicator contained />
                  )}
                </div>
              </div>
            </section>
          </>
        ) : (
          <Loadindicator contained />
        )}

        <Student_reviews />
        <Best_instructors />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default University_progressions;
