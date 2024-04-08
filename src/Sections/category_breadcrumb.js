import React from "react";
import { Link } from "react-router-dom";
import { Nav_context } from "../Contexts";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";

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
    return (
      <Nav_context.Consumer>
        {({ master_courses, submenus, load_subnavs }) => {
          return (
            <section>
              <div className="container">
                <div className="row">
                  {master_courses?.map
                    ? master_courses.map((c) => {
                        if (!submenus[c._id])
                          load_subnavs({
                            ...c,
                            _id: c._id,
                            submenu: c.courses,
                          });

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

                            {!submenus[c._id] ? (
                              <Loadindicator small />
                            ) : (
                              <div class="edu_wraper">
                                <ul class="lists-3 row">
                                  {submenus[c._id]
                                    ?.slice(0, 6)
                                    ?.map((learn, i) =>
                                      learn.title ? (
                                        <li
                                          key={i}
                                          onClick={() =>
                                            this.handle_course(learn)
                                          }
                                          class="col-12 m-0"
                                          style={{
                                            fontSize: 18,
                                            lineHeight: 3,
                                          }}
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
                            )}
                          </div>
                        ) : null;
                      })
                    : null}
                </div>
              </div>
            </section>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Category_breadcrumb;
