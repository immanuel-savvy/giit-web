import React from "react";
import Loadindicator from "../../Components/loadindicator";
import Select_filter from "../../Components/select_filter";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    this.setState({ filter: this.select_filter() });
  };

  select_filter = () =>
    new Array(
      {
        _id: "cates",
        label_text: "category",
        options: new Array({ title: "-- All categories --", default: true }),
      },
      {
        _id: "price",
        label_text: "price",
        options: new Array(
          {
            title: "All",
          },
          {
            title: "free",
          },
          {
            title: "paid",
          }
        ),
      },
      {
        _id: "instructor",
        label_text: "instructor",
        options: new Array({ title: "-- All instructors --", default: true }),
      }
    );

  filter_courses = () => {};

  course = ({
    title,
    _id,
    instructor,
    tags,
    classes,
    enrollments,
    status,
    cost,
  }) => {
    return (
      <tr key={_id}>
        <th scope="row">1</th>
        <td>
          <h6>{title}</h6>
          <p>
            Instructor:<span>{instructor.fullname}</span>
          </p>
        </td>
        <td>
          <div class="dhs_tags">{tags[0]}</div>
        </td>
        <td>
          <div class="smalls">{`${classes} Classes`}</div>
        </td>
        <td>
          <span class="smalls">{`Total: ${enrollments}`}</span>
        </td>
        <td>
          <span class="trip theme-cl theme-bg-light">{status}</span>
        </td>
        <td>
          <span class="trip theme-cl theme-bg-light">{cost}</span>
        </td>
        <td>
          <div class="dropdown show">
            <a
              class="btn btn-action"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-ellipsis-h"></i>
            </a>
            <div class="drp-select dropdown-menu">
              <a class="dropdown-item" href="JavaScript:Void(0);">
                View
              </a>
              <a class="dropdown-item" href="JavaScript:Void(0);">
                Edit
              </a>
              <a class="dropdown-item" href="JavaScript:Void(0);">
                Delete
              </a>
            </div>
          </div>
        </td>
      </tr>
    );
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
                <div class="col-xl-12 col-lg-12 col-md-12 mb-2">
                  <div class="table-responsive">
                    <table class="table dash_list">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Title</th>
                          <th scope="col">Category</th>
                          <th scope="col">Classes</th>
                          <th scope="col">Enrolled</th>
                          <th scope="col">Status</th>
                          <th scope="col">Price</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses ? (
                          courses.map((course) => this.course(course))
                        ) : (
                          <Loadindicator />
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Pagination */}
              <div class="row align-items-center justify-content-between">
                <div class="col-xl-6 col-lg-6 col-md-12">
                  <p class="p-0">Showing 1 to 15 of 15 entire</p>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-12">
                  <nav class="float-right">
                    <ul class="pagination smalls m-0">
                      <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">
                          <i class="fas fa-arrow-circle-left"></i>
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li class="page-item active">
                        <a class="page-link" href="#">
                          2 <span class="sr-only">(current)</span>
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          <i class="fas fa-arrow-circle-right"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manage_courses;
