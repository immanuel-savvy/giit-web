import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../../Assets/js/utils/functions";
import Loadindicator from "../../Components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Add_new_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_pill: "basic",
    };
  }

  tab_pills = new Array("basic", "pricing", "media", "finish");

  render_tab_pills = () => {
    let { current_pill } = this.state;

    return this.tab_pills.map((pill) => (
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
        onClick={() => this.setState({ current_pill: pill })}
      >
        {to_title(pill)}
      </button>
    ));
  };

  finish_tab_panel = () => {
    let { new_course } = this.state;

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
        {new_course ? (
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
          />
        </div>

        <div className="form-group smalls">
          <label>Short Description</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group smalls">
          <label>Description</label>
          <textarea className="summernote"></textarea>
        </div>

        <div className="form-group smalls">
          <label>Category*</label>
          <div className="simple-input">
            <select id="cates" className="form-control">
              <option value="">&nbsp;</option>
              <option value="1">Parent</option>
              <option value="2">Banking</option>
              <option value="3">Medical</option>
              <option value="4">Insurence</option>
              <option value="5">Finance & Accounting</option>
            </select>
          </div>
        </div>

        <div className="form-group smalls">
          <label>Level</label>
          <div className="simple-input">
            <select id="lvl" className="form-control">
              <option value="">&nbsp;</option>
              <option value="1">Beginner</option>
              <option value="2">Basic</option>
              <option value="3">Mediam</option>
              <option value="4">Advance</option>
            </select>
          </div>
        </div>

        <div className="form-group smalls">
          <input
            id="l2l"
            className="checkbox-custom"
            name="l2l"
            type="checkbox"
          />
          <label for="l2l" className="checkbox-custom-label">
            Check this for featured course
          </label>
        </div>

        {this.pill_nav("basic")}
      </div>
    );
  };

  pricing_tab_panel = () => {
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
          <div className="drios">
            <input
              id="l23"
              className="checkbox-custom"
              name="l23"
              type="checkbox"
            />
            <label for="l23" className="checkbox-custom-label">
              Check this if Course id Free
            </label>
          </div>
        </div>

        <div className="form-group smalls">
          <label>Course Price($)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Course Price"
          />
        </div>

        <div className="form-group smalls">
          <label>Discount Price($)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Discount Price"
          />
          <div className="drios">
            <input
              id="l22"
              className="checkbox-custom"
              name="l22"
              type="checkbox"
            />
            <label for="l22" className="checkbox-custom-label">
              Enable This Discount
            </label>
          </div>
        </div>

        {this.pill_nav("pricing")}
      </div>
    );
  };

  media_tab_panel = () => {
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
          />
        </div>

        <div className="form-group smalls">
          <label>Thumbnail</label>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile" />
            <label className="custom-file-label" for="customFile">
              Choose file
            </label>
          </div>
        </div>

        {this.pill_nav("media")}
      </div>
    );
  };

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
