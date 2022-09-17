import React from "react";
import Single_category from "./single_category";

class Featured_course_categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: new Array(
        {
          _id: 1,
          title: "development",
          courses: 22,
        },
        {
          _id: 2,
          title: "web designing",
          courses: 18,
        },
        {
          _id: 3,
          title: "networking",
          courses: 35,
        },
        {
          _id: 4,
          title: "graphic design",
          courses: 8,
        },
        {
          _id: 5,
          title: "digital marketing",
          courses: 6,
        }
      ),
    };
  }

  render() {
    let { categories } = this.state;

    return (
      <section className="min gray">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Explore Featured <span className="theme-cl">Categories</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {categories.map((category) => (
              <Single_category category={category} key={category._id} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Featured_course_categories;
