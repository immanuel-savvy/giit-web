import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Instructor from "../Sections/instructor";
import Student_reviews from "../Sections/student_reviews";
import Breadcrumb from "../Sections/breadcrumb";

class Instructors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let instructors = await get_request("instructors/all");
    this.setState({ instructors });
  };

  render() {
    let { hide_nav } = this.props;
    let { instructors } = this.state;

    return (
      <div id="main-wrapper">
        {hide_nav ? null : <Header page="instructors" />}
        <div className="clearfix"></div>
        <Breadcrumb page_title="Instructors" page_text="Instructors" />
        <section class="min">
          <div class="container">
            <div class="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h2>Our Instructors</h2>
                  <p>We have the best instructors in the Africa.</p>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              {instructors ? (
                instructors.length ? (
                  instructors.map((instructor) => (
                    <Instructor instructor={instructor} key={instructor._id} />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>
        </section>

        <Student_reviews />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Instructors;
