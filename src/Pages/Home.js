import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Banner from "../Sections/banner";
import Certification_courses from "../Sections/certification_courses";
import Combo_courses from "../Sections/combo_courses";
import Contact_us_today from "../Sections/contact_us_today";
import Courses from "../Sections/courses";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Master_courses from "../Sections/Master_courses";
import Ratings from "../Sections/ratings";
import Services from "../Sections/services";
import Student_reviews from "../Sections/student_reviews";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let sections = await get_request("sections");
    sections &&
      sections.push &&
      sections.push("master_course", "combo", "certification");

    this.setState({ sections });
  };

  render = () => {
    let { sections } = this.state;
    let { navs } = this.props;

    return (
      <div id="main-wrapper">
        <Header navs={navs} />
        <Banner />
        <Ratings />
        {sections && sections.map ? (
          sections.map((section, index) => {
            if (section === "combo")
              return <Combo_courses gray={!!(index % 2)} key={index} />;
            else if (section === "certification")
              return <Certification_courses gray={!!(index % 2)} key={index} />;
            else if (section === "master_course")
              return <Master_courses gray={!!(index % 2)} key={index} />;
            else
              return (
                <Courses gray={!!(index % 2)} section={section} key={index} />
              );
          })
        ) : (
          <Loadindicator contained />
        )}

        <Student_reviews />
        {/* <Latest_news_and_articles /> */}
        <Contact_us_today />
        <Services />
        <Footer />
      </div>
    );
  };
}

export default Index;
