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
import Ratings from "../Sections/ratings";
import Services from "../Sections/services";
import Student_reviews from "../Sections/student_reviews";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let categories = await get_request("categories");
    this.setState({ categories });
  };

  render = () => {
    let { categories } = this.state;

    return (
      <div id="main-wrapper">
        <Header />
        <Banner />
        <Ratings />
        {categories && categories.map ? (
          categories.map((category, index) => {
            if (category.name === "combo")
              return <Combo_courses gray={!!(index % 2)} key={category._id} />;
            else if (category.name === "certification")
              return (
                <Certification_courses
                  gray={!!(index % 2)}
                  title="Certification Courses"
                  key={category._id}
                />
              );
            else
              return (
                <Courses
                  gray={!!(index % 2)}
                  category={category}
                  key={category._id}
                />
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
