import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";

class Add_combo_form extends React.Component {
  constructor(props) {
    super(props);

    this.state = { courses: new Array(), search_results: new Array() };
  }

  componentDidMount = () => {};

  set_title = ({ target }) => this.setState({ title: target.value });

  set_description = ({ target }) =>
    this.setState({ short_description: target.value });

  set_search_param = ({ target }) =>
    this.setState({ search_param: target.value });

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

  search = async () => {
    let { search_param } = this.state;

    if (!search_param) return null;
    this.setState({ search_results: "" });

    let search_results = await post_request("search_courses", { search_param });
    this.setState({ search_results });
  };

  create_combo = async () => {
    let { courses, title, image, short_description } = this.state;

    let combo = {
      courses: courses.map((c) => c._id),
      short_description,
      image,
      title,
    };

    let response = await post_request("create_combo_course", combo);
    combo._id = response._id;
    combo.image = response.image;
    combo.created = response.created;

    emitter.emit("new_combo_course", combo);
    this.props.toggle();
  };

  handle_image = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => this.setState({ file, image: reader.result });
  };

  render() {
    let { toggle } = this.props;
    let {
      title,
      courses,
      search_param,
      image,
      short_description,
      search_results,
    } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Combo</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={toggle}
              >
                <span aria-hidden="true">
                  <i className="fas fa-times-circle"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group smalls">
                <label>Combo Image</label>
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
                <div class="d-flex align-items-center justify-content-center">
                  {image ? (
                    <img
                      className="py-3"
                      style={{
                        maxHeight: 200,
                        maxWidth: 200,
                        resize: "both",
                      }}
                      src={this.state.image}
                    />
                  ) : null}
                </div>
              </div>
              <div className="form-group smalls">
                <label>Combo Title*</label>
                <input
                  type="text"
                  placeholder="Course1 + Course2"
                  className="form-control"
                  onChange={this.set_title}
                  value={title}
                />
              </div>
              <div className="form-group">
                <label>Short Description*</label>
                <textarea
                  onChange={this.set_description}
                  value={short_description}
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Selected Courses*</label>
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
                      onChange={this.set_search_param}
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

              {courses.length && short_description && title ? (
                <div className="col-lg-12 col-md-12 col-sm-12 pt-2">
                  <button
                    onClick={this.create_combo}
                    style={{ color: "#fff" }}
                    className="btn theme-bg rounded full-width"
                  >
                    Create
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_combo_form;
