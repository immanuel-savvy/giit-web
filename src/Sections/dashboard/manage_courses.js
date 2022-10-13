import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import Select_filter from "../../Components/select_filter";
import { emitter } from "../../Giit";
import Featured_course from "../course";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      page_size: 10,
      total_courses: "-",
    };
  }

  componentDidMount = async () => {
    let res = await post_request("courses", {
      total_courses: true,
    });
    let { total_courses, courses } = res;

    console.log(res);

    this.setState({
      filter: await this.select_filter(),
      courses,
      total_courses,
    });
  };

  select_filter = async () => {
    let sections = await get_request("sections");
    let master_courses = await get_request("master_courses/all");

    return new Array(
      {
        _id: "cates",
        label_text: "category",
        options: new Array(
          { title: "-- All master_courses --", default: true },
          ...master_courses.map(
            (category) =>
              new Object({ title: category.title, value: category._id })
          )
        ),
      },
      {
        _id: "section",
        label_text: "section",
        options: new Array(
          { title: "-- All section --", default: true },
          ...sections.map(
            (section) =>
              new Object({ title: section.title, value: section._id })
          )
        ),
      }
    );
  };

  filter_courses = () => {};

  page = async (pager) => {};

  render_pagers = () => {
    let { page_size, page, total_courses } = this.state,
      mapper = new Array();
    for (let p = 0; p < total_courses; p += page_size) mapper.push(p);

    return mapper.map((pager, index) => (
      <li
        class={`page-item ${index === page ? "active" : ""}`}
        onClick={() => this.page(index)}
      >
        <a class="page-link" href="#">
          {pager + 1}
        </a>
      </li>
    ));
  };

  render_pagination = () => {
    let { page, page_size, courses, total_courses } = this.state;

    return (
      <div class="row align-items-center justify-content-between">
        <div class="col-xl-6 col-lg-6 col-md-12">
          <p class="p-0">{`Showing ${page * page_size + 1} to ${
            page * page_size + courses.length
          } of ${total_courses} entire`}</p>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12">
          <nav class="float-right">
            <ul class="pagination smalls m-0">
              <li class={`page-item ${page === 0 ? "disabled" : ""}`}>
                <a class="page-link" href="#" tabindex="-1">
                  <i class="fas fa-arrow-circle-left"></i>
                </a>
              </li>

              {this.render_pagers()}

              <li
                class={`page-item ${
                  (page + 1) * page_size > total_courses ? "disabled" : ""
                }`}
              >
                <a class="page-link" href="#">
                  <i class="fas fa-arrow-circle-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  edit_course = (course) => emitter.emit("edit_course", course);

  delete_course = async (course_id) => {
    let { courses, total_courses } = this.state;
    courses = courses.filter((course) => course._id !== course_id);
    total_courses--;
    this.setState({ courses, total_courses });
    await post_request(`remove_course/${course_id}`);
  };

  render() {
    let { filter, courses } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage course" />

        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="dashboard_wrap">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                  <h6 className="m-0">All Courses List</h6>
                </div>
              </div>
              <div className="row align-items-end mb-5">
                {filter ? (
                  filter.map((filter_, index) => (
                    <Select_filter selection={filter_} key={index} />
                  ))
                ) : (
                  <Loadindicator />
                )}
                {filter ? (
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                    <div className="form-group">
                      <button
                        type="button"
                        onClick={this.filter_courses}
                        className="btn text-white full-width theme-bg"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="row justify-content-between">
                <div class="col-xl-2 col-lg-3 col-md-6">
                  <div class="form-group smalls row align-items-center">
                    <label class="col-xl-3 col-lg-3 col-sm-2 col-form-label">
                      Show
                    </label>
                    <div class="col-xl-9 col-lg-9 col-sm-10">
                      <select
                        onChange={this.set_course_fetch_limit}
                        id="course_limit"
                        class="form-control"
                      >
                        <option value="10">10 courses</option>
                        <option value="25">25 courses</option>
                        <option value="35">35 courses</option>
                        <option value="50">50 courses</option>
                        <option value="100">100 courses</option>
                        <option value="250">250 courses</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-5 col-md-6">
                  <div class="form-group smalls row align-items-center">
                    <label class="col-xl-2 col-lg-2 col-sm-2 col-form-label">
                      Search
                    </label>
                    <div class="col-xl-10 col-lg-10 col-sm-10">
                      <input
                        onChange={this.search_course}
                        type="text"
                        placeholder="Course title..."
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr />
                {courses && courses.map ? (
                  courses.map((course) => (
                    <Featured_course
                      adminstrator
                      course={course}
                      key={course._id}
                      delete_course={() => {
                        window.confirm("Are you sure to remove course? ") &&
                          this.delete_course(course._id);
                      }}
                      edit_course={() => this.edit_course(course)}
                    />
                  ))
                ) : (
                  <Loadindicator />
                )}
              </div>
              {/* Pagination */}
              {courses ? this.render_pagination() : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manage_courses;
