import React from "react";
import { special_chars, to_title } from "../../Assets/js/utils/functions";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import { domain } from "../../Constants/constants";
import { emitter } from "../../Giit";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Add_instructor extends Handle_image_upload {
  constructor(props) {
    super(props);

    let { instructor } = this.props;

    this.state = {
      ...instructor,
      courses: new Array(),
      search_results: new Array(),
    };
  }

  componentDidMount = async () => {
    let { instructor } = this.props;

    if (instructor)
      if (instructor.courses) {
        let courses = await get_request(`instructor_courses/${instructor._id}`);
        this.setState({ courses });
      }
  };

  handle_course = (course_) => {
    let { courses } = this.state;

    if (courses.find((course) => course._id === course_._id))
      courses = courses.filter((course) => course._id !== course_._id);
    else courses.push(course_);

    this.setState({ courses });
  };

  course = (course) => {
    let { title, _id, categories } = course;
    return (
      <tr
        style={{ cursor: "pointer" }}
        onClick={() => this.handle_course(course)}
      >
        <td>
          <a className="btn btn-action">
            <i
              className={`fas fa-${
                this.state.courses.find((course_) => course_._id === _id)
                  ? "check"
                  : "square"
              }`}
            ></i>
          </a>
        </td>
        <td>
          <h6>{to_title(title)}</h6>
        </td>
        <td>
          <div className="dhs_tags">
            {categories &&
              categories[0] &&
              to_title(categories[0].tags.split(",")[0])}
          </div>
        </td>
      </tr>
    );
  };

  search = async (e) => {
    e.preventDefault();
    let { search_param } = this.state;

    if (!search_param) return null;
    this.setState({ search_results: "" });

    let search_results = await post_request("search_courses", { search_param });
    this.setState({ search_results });
  };

  submit = async () => {
    let { name, courses, image_hash, linkedin, profession, _id, image } =
      this.state;
    this.setState({ uploading: true });

    name = name.trim().replace(special_chars, "");

    let instructor = {
      name,
      profession,
      image,
      courses: courses.map((course) => course._id),
      uri: name.toLowerCase().replace(/ /g, "_"),
      image_hash,
      linkedin,
      _id,
    };

    console.log(instructor);
    if (_id) delete instructor.courses;

    let response = await post_request(
      _id ? "update_instructor" : "add_instructor",
      instructor
    );
    instructor._id = response._id;
    instructor.created = response.created;
    instructor.image = response.image;

    emitter.emit(_id ? "instructor_updated" : "new_instructor", instructor);
    this.clear_state();
  };

  clear_state = () =>
    this.setState({
      uploading: false,
      name: "",
      profession: "",
      courses: new Array(),
      search_results: new Array(),
      search_param: "",
      image: "",
      image_hash: "",
    });

  render() {
    let {
      profession,
      name,
      image_loading,
      courses,
      search_param,
      search_results,
      _id,
      image,
      uploading,
      linkedin,
    } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="Add Instructor" />

        <div className="row">
          <form className="forms_block">
            <div className="form-group smalls">
              <label>Image (700 x 550)*</label>
              {image_loading ? (
                <Loadindicator />
              ) : (
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={this.handle_image}
                  />
                  <label className="custom-file-label" for="customFile">
                    Choose image
                  </label>
                </div>
              )}
              <div class="d-flex align-items-center justify-content-center">
                {image ? (
                  <img
                    className="py-3"
                    style={{
                      maxHeight: 200,
                      maxWidth: 200,
                      resize: "both",
                    }}
                    src={
                      image.startsWith("data")
                        ? image
                        : `${domain}/Images/${image}`
                    }
                  />
                ) : null}
              </div>
            </div>
            <div className="form-group smalls">
              <label>Full Name*</label>
              <input
                type="text"
                className="form-control"
                onChange={({ target }) => this.setState({ name: target.value })}
                value={name}
              />
            </div>

            <div className="form-group smalls">
              <label>Profession*</label>
              <input
                type="text"
                className="form-control"
                onChange={({ target }) =>
                  this.setState({ profession: target.value })
                }
                value={profession}
              />
            </div>

            <div className="form-group smalls">
              <label>Linked-In</label>
              <input
                type="url"
                className="form-control"
                onChange={({ target }) =>
                  this.setState({ linkedin: target.value })
                }
                value={linkedin}
              />
            </div>

            {_id ? null : (
              <span>
                <div className="form-group">
                  <label>Instructor Courses</label>
                  {
                    <table className="table dash_list">
                      {courses ? (
                        courses.length ? (
                          courses.map((course) => this.course(course))
                        ) : null
                      ) : (
                        <Loadindicator contained />
                      )}
                    </table>
                  }
                </div>
                <div className="row d-flex align-items-center">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="form-group smalls">
                      <label>Search Course</label>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        onChange={({ target }) =>
                          this.setState({ search_param: target.value })
                        }
                        value={search_param}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 pt-2">
                    <button
                      onClick={this.search}
                      style={{ color: "#fff" }}
                      className="btn theme-bg rounded full-width"
                    >
                      Search
                    </button>
                  </div>
                </div>
                {
                  <table className="table dash_list">
                    {search_results ? (
                      search_results.length ? (
                        search_results.map((course) => this.course(course))
                      ) : null
                    ) : (
                      <Loadindicator contained />
                    )}
                  </table>
                }
              </span>
            )}
            {uploading ? (
              <Loadindicator />
            ) : (
              <div className="form-group smalls">
                <button
                  onClick={name && profession && image && this.submit}
                  type="button"
                  className={`btn full-width ${
                    name && profession && image ? "theme-bg" : "grey"
                  } short_description-white`}
                >
                  {_id ? "Update Instructor" : "Add Instructor"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Add_instructor;
