import React from "react";
import Awards from "../Sections/awards";
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
import We_have_the_best_instructors from "../Sections/we_have_the_best_instructors";

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
        <Featured_course_categories white_bg />
        <Learning_procedure />
        <Courses featured />
        <Student_reviews />
        <Latest_news_and_articles />
        <Contact_us_today />
        <Footer />
      </div>
    );
  };
}

export default Index;