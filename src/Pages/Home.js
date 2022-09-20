import React from "react";
import Banner from "../Sections/banner";
import Contact_us_today from "../Sections/contact_us_today";
import Courses from "../Sections/courses";
import Featured_course_categories from "../Sections/featured_course_categories";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Latest_news_and_articles from "../Sections/latest_news_and_articles";
import Learning_procedure from "../Sections/Learning_prcedure";
import Ratings from "../Sections/ratings";
import Student_reviews from "../Sections/student_reviews";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render = () => {
    return (
      <div id="main-wrapper">
        <Header />
        <Banner />
        <Ratings />
        {/* <Featured_course_categories white_bg />
        <Learning_procedure /> */}
        <Courses
          section="degree"
          title="Get a Degree from UK"
          subtitle="Give yourself a competitive edge by completing a globally recognised degree. Students can complete a British degree without having to travel to the UK."
        />
        <Courses
          section="master"
          bg="gray"
          title="Top Master Career Course"
          subtitle="Without any past expertise, you can start a new career in information technology."
        />
        <Courses
          section="professional"
          title="Top-tier Professional Course"
          subtitle="In less than six weeks, you’ll master in-demand skills that will prepare you for workforce."
        />

        <Student_reviews />
        <Latest_news_and_articles />
        <Contact_us_today />
        <Footer />
      </div>
    );
  };
}

export default Index;
