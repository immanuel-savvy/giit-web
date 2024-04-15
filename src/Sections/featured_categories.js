import React from "react";
import { Footer_context } from "../Contexts";
import Loadindicator from "../Components/loadindicator";
import Category from "../Components/category";
import Explore_more_btn from "./explore_more_btn";

class Featured_categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Footer_context.Consumer>
        {({ master_courses }) => {
          if (master_courses && !master_courses.length) return;

          return (
            <section className="gray">
              <div class="container">
                <div className="row justify-content-center">
                  <div className="col-lg-7 col-md-8">
                    <div className="sec-heading center">
                      <h2>
                        Featured <span className="theme-cl">Categories</span>
                      </h2>
                      <p>
                        Explore Our Categories: Dive into a World of Knowledge
                        and Discovery
                      </p>
                    </div>
                  </div>
                </div>

                <div class="row justify-content-center">
                  {master_courses ? (
                    master_courses.map((cat) =>
                      cat?.title ? (
                        <Category category={cat} key={cat._id} />
                      ) : null
                    )
                  ) : (
                    <Loadindicator />
                  )}
                </div>
              </div>

              <Explore_more_btn to="/master_courses" />
            </section>
          );
        }}
      </Footer_context.Consumer>
    );
  }
}

export default Featured_categories;
