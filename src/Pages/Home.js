import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { organisation_name } from "../Constants/constants";
import { Logged_user } from "../Contexts";
import Banner from "../Sections/banner";
import Certification_courses from "../Sections/certification_courses";
import Combo_courses from "../Sections/combo_courses";
import Contact_us_today from "../Sections/contact_us_today";
import Courses from "../Sections/courses";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Latest_news_and_articles from "../Sections/latest_news_and_articles";
import Master_courses from "../Sections/master_courses";
import Associates from "../Sections/associates";
import Services from "../Sections/services";
import Student_reviews from "../Sections/student_reviews";
import Login from "./Login";

const sections_alignment = new Array("degree", "master", "professional");

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let sections = await get_request("sections/all");
    sections &&
      sections.push &&
      sections.push("master_course", "combo", "certification");

    sections = sections.sort((s1, s2) => {
      let s1_index = sections_alignment.findIndex((m) =>
          (s1.title || s1).toLowerCase().includes(m)
        ),
        s2_index = sections_alignment.findIndex((m) =>
          (s2.title || s2).toLowerCase().includes(m)
        );
      if (s1_index === -1) s1_index = 200;
      if (s2_index === -1) s2_index = 200;

      return s1_index - s2_index;
    });

    this.setState({ sections });
  };

  render = () => {
    let { sections } = this.state;
    let { navs } = this.props;

    return (
      <Logged_user.Consumer>
        {({ loggeduser }) => {
          if (loggeduser) document.title = `Home | ${organisation_name}`;

          return loggeduser === "fetching" ? (
            <Loadindicator contained />
          ) : !loggeduser ? (
            <Login lock />
          ) : (
            <div id="main-wrapper">
              <Header navs={navs} />
              <Banner />
              <Associates />
              {sections && sections.map ? (
                sections.map((section, index) => {
                  if (section === "combo")
                    return <Combo_courses gray={!!(index % 2)} key={index} />;
                  else if (section === "certification")
                    return (
                      <Certification_courses gray={!!(index % 2)} key={index} />
                    );
                  else if (section === "master_course")
                    return <Master_courses gray={!!(index % 2)} key={index} />;
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

              <Student_reviews />
              <Latest_news_and_articles />
              <Services />
              <Contact_us_today />
              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  };
}

export default Index;
