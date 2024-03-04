import React from "react";
import { Link } from "react-router-dom";

class Category_breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_course = (course) => {
    window.sessionStorage.setItem("course", JSON.stringify(course));
    emitter.emit("push_course", course);
  };

  render() {
    let { categories } = this.props;

    if (!categories?.length) return;

    return (
      <section>
        <div className="container">
          <div className="row">
            {categories.map((c) => {
              return c?.title ? (
                <div className="col-md-4 col-lg-3 col-sm-12">
                  <h5
                    onClick={() => this.handle_course(c)}
                    className="theme-cl"
                  >
                    <Link to="/course" className="theme-cl">
                      {c.title?.replace(/_/g, " ")}
                    </Link>
                  </h5>

                  <div class="edu_wraper">
                    <ul class="lists-3 row">
                      {categories.map((learn, i) =>
                        learn.title ? (
                          <li
                            key={i}
                            onClick={() => this.handle_course(learn)}
                            class="col-12 m-0"
                            style={{ fontSize: 18, lineHeight: 3 }}
                          >
                            <Link
                              to="/course"
                              className=""
                              style={{
                                color: "#333",
                                textDecorationLine: "none",
                              }}
                            >
                              {learn.title?.replace(/_/g, " ")}
                            </Link>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Category_breadcrumb;
