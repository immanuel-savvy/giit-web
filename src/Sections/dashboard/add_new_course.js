import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../../Assets/js/utils/functions";
import {
  get_request,
  post_request,
  upload_file,
} from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Add_new_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_pill: "basic",
      sections: new Array(),
    };
  }

  tab_pills = new Array("basic", "pricing", "media", "finish");

  componentDidMount = async () => {
    let course_sections = await get_request("sections");
    let course_categories = await get_request("categories");

    this.setState({ course_sections, course_categories });
  };

  render_tab_pills = () => {
    let { current_pill, short_description, title, price, image } = this.state;
    let finish = !!(
      short_description &&
      title &&
      Number(price) &&
      Number(price) > 0 &&
      image
    );

    return this.tab_pills.map((pill) =>
      !finish && pill === "finish" ? null : (
        <button
          key={pill}
          className={pill === current_pill ? "nav-link active" : "nav-link"}
          id={`v-pills-${pill}-tab`}
          data-toggle="pill"
          data-target={`#v-pills-${pill}`}
          type="button"
          role="tab"
          aria-controls={`v-pills-${pill}`}
          aria-selected={pill === current_pill ? "true" : "false"}
          onClick={() =>
            this.setState(
              { current_pill: pill },
              pill === "finish" ? this.on_finish : null
            )
          }
        >
          {to_title(pill)}
        </button>
      )
    );
  };

  finish_tab_panel = () => {
    let { uploading_course } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "finish"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-finish"
        role="tabpanel"
        aria-labelledby="v-pills-finish-tab"
      >
        {!uploading_course ? (
          <div className="succ_wrap">
            <div className="succ_121">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <div className="succ_122">
              <h4>Course Successfully Added</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="succ_123">
              <Link
                to={`/course?course=${this.state.new_course?._id}`}
                className="btn theme-bg text-white"
              >
                View Course
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center my-5">
            <Loadindicator />
          </div>
        )}
        {this.pill_nav("finish")}
      </div>
    );
  };

  pill_nav = (pill) => {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <ul className="alios_slide_nav">
          <li>
            <a
              href="#"
              onClick={() => this.prev_pill(pill)}
              className={
                pill === "basic" ? "btn btn_slide disabled" : "btn btn_slide"
              }
            >
              <i className="fas fa-arrow-left"></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => this.next_pill(pill)}
              className={
                pill === "finish" ? "btn btn_slide disabled" : "btn btn_slide"
              }
            >
              <i className="fas fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  next_pill = (pill) => {
    let current_pill_index = this.tab_pills.findIndex((p) => p === pill);

    current_pill_index < this.tab_pills.length - 1 &&
      this.setState({ current_pill: this.tab_pills[current_pill_index + 1] });
  };

  prev_pill = (pill) => {
    let current_pill_index = this.tab_pills.findIndex((p) => p === pill);
    current_pill_index &&
      this.setState({ current_pill: this.tab_pills[current_pill_index - 1] });
  };

  basic_tab_panel = () => {
    let { course_sections, course_categories } = this.state;
    return (
      <div
        className={
          this.state.current_pill === "basic"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-basic"
        role="tabpanel"
        aria-labelledby="v-pills-basic-tab"
      >
        <div className="form-group smalls">
          <label>Course Title*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Course Title"
            onChange={({ target }) => this.setState({ title: target.value })}
            value={this.state.title}
          />
        </div>

        <div className="form-group smalls">
          <label>Short Description*</label>
          <input
            onChange={({ target }) =>
              this.setState({ short_description: target.value })
            }
            value={this.state.short_description}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group smalls">
          <label>Description</label>
          <textarea
            onChange={({ target }) =>
              this.setState({ description: target.value })
            }
            value={this.state.description}
            className="summernote form-control"
          ></textarea>
        </div>

        {course_categories && !course_categories.length ? null : (
          <div className="form-group smalls">
            <label>Course Category</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {course_categories ? (
                course_categories.map((category) =>
                  this.course_section_checkbox(category)
                )
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        )}

        <div className="form-group smalls">
          <label>Course Section</label>
          <div
            style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
          >
            {course_sections ? (
              course_sections.map((section) =>
                this.course_section_checkbox(section)
              )
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>

        {this.pill_nav("basic")}
      </div>
    );
  };

  course_category_checkbox = ({ title, _id }) => (
    <div className="form-group smalls">
      <input
        id={_id}
        className="checkbox-custom"
        name="course_category"
        type="checkbox"
        checked={this.state.sections.includes(_id)}
        onChange={() => this.handle_category_check(_id)}
      />
      <label for={_id} className="checkbox-custom-label">
        {to_title(title)}
      </label>
    </div>
  );

  handle_section_check = (category) => {
    let { categories } = this.state;
    if (categories.includes(category))
      categories = categories.filter((category_) => category_ !== category);
    else categories.push(category);

    this.setState({ categories });
  };

  handle_section_check = (section) => {
    let { sections } = this.state;
    if (sections.includes(section))
      sections = sections.filter((section_) => section_ !== section);
    else sections.push(section);

    this.setState({ sections });
  };

  course_section_checkbox = ({ title, _id }) => (
    <div className="form-group smalls">
      <input
        id={_id}
        className="checkbox-custom"
        name="course_sections"
        type="checkbox"
        checked={this.state.sections.includes(_id)}
        onChange={() => this.handle_section_check(_id)}
      />
      <label for={_id} className="checkbox-custom-label">
        {to_title(title)}
      </label>
    </div>
  );

  handle_price = ({ target }) => this.setState({ price: target.value });

  pricing_tab_panel = () => {
    let { price } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "pricing"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-pricing"
        role="tabpanel"
        aria-labelledby="v-pills-pricing-tab"
      >
        <div className="form-group smalls">
          <label>Course Price(&#8358;) *</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Course Price"
            value={price}
            onChange={this.handle_price}
          />
        </div>

        {this.pill_nav("pricing")}
      </div>
    );
  };

  handle_image = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => this.setState({ file, image: reader.result });
  };

  media_tab_panel = () => {
    let { image } = this.state;
    return (
      <div
        className={
          this.state.current_pill === "media"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-media"
        role="tabpanel"
        aria-labelledby="v-pills-media-tab"
      >
        <div className="form-group smalls">
          <label>Video URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://www.youtube.com/watch?v=ExXhmuH-cw8"
            value={this.state.video}
            onChange={({ target }) => this.setState({ video: target.value })}
          />
        </div>

        <div className="form-group smalls">
          <label>Image *</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              accept="image/**"
              onChange={this.handle_image}
            />
            <label className="custom-file-label" for="customFile">
              Choose file
            </label>
          </div>
          <div>
            {image ? (
              <img
                className="py-3 rounded"
                style={{ maxHeight: 200, maxWidth: 200 }}
                src={this.state.image}
              />
            ) : null}
          </div>
        </div>

        {this.pill_nav("media")}
      </div>
    );
  };

  on_finish = async () => {
    this.setState({ uploading_course: true });
    let {
      short_description,
      sections,
      categories,
      title,
      description,
      price,
      video,
      image,
      file,
    } = this.state;
    let course = {
      short_description,
      sections,
      categories,
      title,
      description,
      price: Number(price),
      video,
      image,
    };

    let response = await post_request("add_course", { course });
    course.image = response.image;
    course._id = response._id;
    course.created = response.created;

    if (response._id) {
      this.setState({ new_course: course });

      emitter.emit("new_course", course);
      this.reset_state();
    }
  };

  reset_state = () =>
    this.setState({
      short_description: "",
      description: "",
      image: "",
      video: "",
      price: "",
      title: "",
      uploading_course: false,
      categories: new Array(),
      sections: new Array(),
    });

  render() {
    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="add new course" />
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="dashboard_wrap">
              <div className="form_blocs_wrap">
                <form>
                  <div className="row justify-content-between">
                    <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12">
                      <div
                        className="nav flex-column nav-pills me-3"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        {this.render_tab_pills()}
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12">
                      <div className="tab-content" id="v-pills-tabContent">
                        {this.basic_tab_panel()}
                        {this.pricing_tab_panel()}
                        {this.media_tab_panel()}
                        {this.finish_tab_panel()}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_new_course;
