import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Featured_course from "../course";
import Add_master_course from "./create_master_course";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_master_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let master_courses = await get_request("master_courses/all");
    this.setState({ master_courses });

    this.new_master_course = (master_course) => {
      let { master_courses } = this.state;
      master_courses = new Array(master_course, ...master_courses);
      this.setState({ master_courses });
    };
    this.master_course_updated = (master_course) => {
      let { master_courses } = this.state;
      master_courses = master_courses.map((master_course_) => {
        if (master_course_._id === master_course._id) return master_course;
        return master_course_;
      });
      this.setState({ master_courses });
    };

    emitter.listen("new_master_course", this.new_master_course);
    emitter.listen("master_course_updated", this.master_course_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_master_course", this.new_master_course);
    emitter.remove_listener(
      "master_course_updated",
      this.master_course_updated
    );
  };

  toggle_form = () =>
    this.setState({
      show_form: !this.state.show_form,
      master_course_to_update: null,
    });

  add_new_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Create Master Course
          </a>
        </div>
      </div>
    );

  remove_master_course = async (master_course_id) => {
    let { master_courses } = this.state;
    master_courses = master_courses.filter(
      (master_course) => master_course._id !== master_course_id
    );
    this.setState({ master_courses });

    await post_request(`remove_master_course/${master_course_id}`);
    emitter.emit("master_course_removed", master_course_id);
  };

  edit_master_course = (master_course) =>
    this.state.show_form
      ? emitter.emit("master_course_to_update", master_course)
      : this.setState({
          master_course_to_update: master_course,
          show_form: true,
        });

  render() {
    let { master_courses, show_form, master_course_to_update } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="master courses"
          on_click={this.toggle_form}
          hide={
            show_form ||
            !master_courses ||
            (master_courses && !master_courses.length)
          }
          title="manage master course"
        />

        <div class="row">
          {show_form ? (
            <div>
              <Add_master_course
                master_course={master_course_to_update}
                toggle={this.toggle_form}
              />
              <hr />
            </div>
          ) : null}

          {master_courses ? (
            master_courses.length && master_courses.map ? (
              master_courses.map((master_course) => (
                <Featured_course
                  course={master_course}
                  delete_course={() => {
                    window.confirm("Are you sure to remove master course? ") &&
                      this.remove_master_course(master_course._id);
                  }}
                  edit_course={() => this.edit_master_course(master_course)}
                  in_courses
                />
              ))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                {this.add_new_btn()}
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_master_courses;
