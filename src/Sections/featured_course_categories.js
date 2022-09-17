import React from "react";
import Single_category from "./single_category";
import Single_category_colored from "./single_category_colored";

class Featured_course_categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: new Array(
        {
          _id: 1,
          title: "development",
          courses: 22,
          image: "http://localhost:3000/Assets/img/content.png",
        },
        {
          _id: 2,
          title: "web designing",
          courses: 18,
          image: "http://localhost:3000/Assets/img/briefcase.png",
        },
        {
          _id: 3,
          title: "networking",
          courses: 35,
          image: "http://localhost:3000/Assets/img/career.png",
        },
        {
          _id: 4,
          title: "graphic design",
          courses: 8,
          image: "http://localhost:3000/Assets/img/python.png",
        },
        {
          _id: 5,
          title: "digital marketing",
          courses: 6,
          image: "http://localhost:3000/Assets/img/designer.png",
        }
      ),
    };
  }

  render() {
    let { white_bg } = this.props;
    let { categories } = this.state;

    return (
      <section className="min">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Explore Featured <span className="theme-cl">Categories</span>
                </h2>
                <p></p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {categories.map((category, index) =>
              white_bg ? (
                <Single_category_colored category={category} key={index} />
              ) : (
                <Single_category category={category} key={index} />
              )
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Featured_course_categories;
