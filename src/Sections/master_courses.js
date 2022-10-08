import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Featured_course from "./course";
import Explore_more_btn from "./explore_more_btn";

class Master_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { all } = this.props;

    let master_courses = await get_request(
      `master_courses/${all ? "all" : "6"}`
    );

    this.setState({ master_courses });
  };

  render() {
    let { gray, all } = this.props;
    let { master_courses } = this.state;
    if (master_courses && !master_courses.length) return null;

    return (
      <section className={`${gray ? "gray" : ""} min`} id="master_courses">
        <div className="container">
          {all ? null : (
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h2>Top Master Career Course</h2>
                  <p>
                    Without any past expertise, you can start a new career in
                    information technology.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="row justify-content-center">
            {master_courses ? (
              master_courses.map((course, index) => (
                <Featured_course course={course} key={index} />
              ))
            ) : (
              <Loadindicator contained />
            )}
          </div>
          {all ? null : (
            <Explore_more_btn title="master courses" to={"/master_courses"} />
          )}
        </div>
      </section>
    );
  }
}

export default Master_courses;
