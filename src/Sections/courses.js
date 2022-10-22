import React from "react";
import { shuffle_array } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";
import Featured_course from "./course";
import Explore_more_btn from "./explore_more_btn";

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { section } = this.props;

    let arr = shuffle_array(section.courses.filter((c) => c));
    let courses = arr.slice(0, 6);

    courses = await post_request(`get_courses`, {
      courses,
    });

    courses.length < 6 && courses.push(...courses.slice(0, 6 - courses.length));

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
          {courses && courses.length ? (
            <Explore_more_btn title={title} to={`/courses?section=${_id}`} />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Courses;
