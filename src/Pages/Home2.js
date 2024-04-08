import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { organisation_name } from "../Constants/constants";
import { Logged_user } from "../Contexts";
import Certification_courses from "../Sections/certification_courses";
import Combo_courses from "../Sections/combo_courses";
import Contact_us_today from "../Sections/contact_us_today";
import Courses from "../Sections/courses";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Latest_news_and_articles from "../Sections/latest_news_and_articles";
import Student_reviews from "../Sections/student_reviews";
import Flash_promo from "../Sections/flash_promo";
import Best_instructors from "../Sections/best_instructors";
import Onboarding_steps from "../Sections/onboarding_steps";
import Faqs from "../Sections/faqs";
import { emitter } from "../Giit";
import Upcoming_seminars from "../Sections/upcoming_seminar";
import Banner_keypoints from "../Components/banner_keypoints";
import Featured_categories from "../Sections/featured_categories";
import E_banner from "../Sections/e_banner";

const sections_alignment = new Array("degree", "master", "professional");

class Home2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let sections = await get_request("sections/all");

    if (sections && sections.push) sections.push("combo");

    sections = sections.sort((s1, s2) => {
      let s1_index = sections_alignment.findIndex((m) =>
          (s1.title || s1).toLowerCase().includes(m)
        ),
        s2_index = sections_alignment.findIndex((m) =>
          (s2.title || s2).toLowerCase().includes(m)
        );
      if (s1_index === -1) s1_index = 200;
      if (s2_index === -1) s2_index = 200;

      if (
        s1?.title &&
        s1.title.toLowerCase().includes("degree") &&
        s1.title.toLowerCase().includes("uk")
      )
        emitter.emit("ncc_section", s1._id);

      return s1_index - s2_index;
    });

    this.setState({ sections });

    if (!window.localStorage.getItem("ask_to_subscribe"))
      this.subscribe?.setState({ show: true });
  };

  render = () => {
    let { sections } = this.state;
    let { navs, onboarding_stuffs, best_instructors_stuffs } = this.props;

    return (
      <Logged_user.Consumer>
        {({ loggeduser }) => {
          if (loggeduser) document.title = `Home | ${organisation_name}`;

          return (
            <div id="main-wrapper">
              <Header navs={navs} elearn />
              <div className="body">
                <E_banner />

                <Banner_keypoints />

                <Featured_categories />

                {sections && sections.map ? (
                  sections.map((section, index) => {
                    if (section === "combo")
                      return <Combo_courses gray={!!(index % 2)} key={index} />;
                    else
                      return (
                        <Courses
                          gray={!!(index % 2)}
                          section={section}
                          key={index}
                        />
                      );
                  })
                ) : (
                  <Loadindicator contained />
                )}
                <Flash_promo />
                <Certification_courses gray={true} />
                <Best_instructors
                  best_instructors_stuffs={best_instructors_stuffs}
                />
                <Onboarding_steps onboarding_stuffs={onboarding_stuffs} />

                <Upcoming_seminars />

                <Student_reviews />

                <Latest_news_and_articles />
                <Faqs limit={6} />
              </div>
              <Contact_us_today />
              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  };
}

export default Home2;
