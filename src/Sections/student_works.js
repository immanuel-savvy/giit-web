import React from "react";
import { get_request, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Student_work from "../Components/student_work";
import Explore_more_btn from "./explore_more_btn";

class Student_works extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let student_works = await get_request("student_works");

    this.setState({ student_works });
  };

  render() {
    let { gray, all } = this.props;
    let { student_works } = this.state;

    if (student_works && !student_works.length) return null;

    return (
      <section className={gray ? `gray` : ""}>
        <div className="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  Where our Students&nbsp;
                  <span class="theme-cl">Work</span>
                </h2>
                <p></p>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            {student_works ? (
              student_works.map((work) => (
                <Student_work key={work._id} work={work} />
              ))
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>

        {all ? null : <Explore_more_btn title="" to={"/students_works"} />}
      </section>
    );
  }
}

export default Student_works;
