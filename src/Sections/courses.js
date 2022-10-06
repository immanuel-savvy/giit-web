import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";
import Featured_course from "./course";

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { section } = this.props;

    let courses = await post_request(`section_courses/${section._id}`);

    console.log(courses, section.title);
    this.setState({ courses });

    this.section_removed = (section_id) =>
      section_id === section._id && this.setState({ removed: true });

    emitter.emit("section_removed", this.section_removed);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("section_removed", this.section_removed);
  };

  render() {
    let { section, gray } = this.props;
    let { title, text, _id } = section;
    let { courses, removed } = this.state;
    if ((courses && !courses.length) || removed) return null;

    return (
      <section className={gray ? `gray` : ""}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {courses && courses.length ? (
              courses.map((course, index) => (
                <Featured_course course={course} key={index} />
              ))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                <Loadindicator />
              </div>
            )}
          </div>
          {courses ? (
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8 mt-2">
                <div className="text-center">
                  <Link
                    to={`/courses?section=${_id}`}
                    className="btn btn-md theme-bg-light theme-cl"
                  >
                    {`Explore More ${to_title(title)}`}
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Courses;
