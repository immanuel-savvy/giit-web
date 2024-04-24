import React from "react";
import { Accordion } from "react-bootstrap";
import { domain, get_request, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { Logged_admin } from "../Contexts";
import { emitter } from "../Giit";
import Curriculum_form from "./curriculum_form";
import { get_session } from "./footer";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Img_tag } from "../Pages/Article";
import { P_tag } from "./course_overview";
import Text_btn from "../Components/text_btn";
import Handle_image_upload from "../Components/handle_image_upload";

class Course_curriculum extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {
      current_slide_index: 0,
    };
  }

  tabname = "curriculum";

  componentDidMount = async () => {
    let { course, in_all } = this.props;

    let curriculum = await get_request(`curriculum/${course._id}`);
    if (Array.isArray(curriculum))
      curriculum = curriculum.sort((c1, c2) => c1.created - c2.created);

    this.setState({ curriculum });

    this.new_slide = (slide) => {
      if (slide.course !== course._id) return;

      let { curriculum } = this.state;
      if (curriculum.find((curr) => curr.topic === slide.topic)) return;

      curriculum = new Array(...curriculum, slide);
      this.setState({ curriculum, current_slide_index: curriculum.length - 1 });
    };

    this.slide_update = (slide) => {
      if (slide.course !== course._id) return;

      let { curriculum, current_slide_index } = this.state;
      curriculum = curriculum.map((curr, index) => {
        if (curr._id === slide._id) {
          current_slide_index = index;
          return slide;
        }
        return curr;
      });
      this.setState({
        curriculum,
        slide_in_edit: null,
        show_form: false,
        current_slide_index,
      });
    };

    emitter.listen("new_slide", this.new_slide);
    emitter.listen("slide_update", this.slide_update);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("slide_update", this.slide_update);
    emitter.remove_listener("new_slide", this.new_slide);
  };

  remove_slide = (index) => {
    this.setState({ current_slide_index: index }, async () => {
      if (!window.confirm("Remove slide?")) return;

      let { curriculum } = this.state;

      let slide = curriculum.splice(index, 1);
      this.setState({ curriculum });

      await post_request("remove_slide", {
        slide: slide[0]._id,
        course: this.props.course._id,
      });
    });
  };

  edit_slide = (index) => {
    let slide = this.state.curriculum[index];

    this.setState({ slide_in_edit: slide, show_form: true });
  };

  curriculum = ({ topic, subtopics, _id }, index) => {
    let { current_slide_index } = this.state;

    return (
      <Accordion.Item eventKey={`${index}`} key={_id}>
        <Accordion.Header>
          <h6 className="mb-0 accordion_title mt-5">
            <a
              href="#"
              data-toggle="collapse"
              data-target={`#collapse${index}`}
              aria-expanded={current_slide_index === index ? "true" : "false"}
              aria-controls={`collapse${index}`}
              className="d-block position-relative text-dark py-2"
            >
              {`${topic}`}

              {this.admin_logged ? (
                <span>
                  <a
                    onClick={() => this.remove_slide(index)}
                    className="btn btn-action ml-2"
                  >
                    <i className={`fas fa-window-close`}></i>
                  </a>

                  <a
                    onClick={() => this.edit_slide(index)}
                    className="btn btn-action ml-2"
                  >
                    <i className={`fas fa-edit`}></i>
                  </a>
                </span>
              ) : null}
            </a>
          </h6>
        </Accordion.Header>
        <Accordion.Body>
          <div className="card-body pl-3 pr-3">
            <ul className="lectures_lists">
              {subtopics.map(({ text, duration, book, video, file }, index) => (
                <li key={index} className={"incomplete" || "complete"}>
                  <div className="lectures_lists_title">
                    <i className="fas fa-check dios"></i>
                  </div>
                  <ReactMarkdown
                    children={text}
                    components={{
                      img: Img_tag,
                      p: P_tag,
                    }}
                  />

                  {duration ? (
                    <span className="cls_timing">
                      Duration: {duration || "-"}
                    </span>
                  ) : null}
                  {video ? (
                    <span className="cls_timing">40:20</span>
                  ) : book ? (
                    <></>
                  ) : null}

                  {file ? (
                    <a
                      href={`${domain}/Files/${file}`}
                      target="_blank"
                      style={{ visibility: "hidden" }}
                      className={`file_${index}`}
                    ></a>
                  ) : null}
                  {file ? (
                    <Text_btn
                      text="Download Material"
                      action={() => {
                        document.querySelector(`.file_${index}`).click();
                      }}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  toggle_curriculum_form = () =>
    this.setState({ show_form: !this.state.show_form });

  upload_curriculum_file = async () => {
    let { course } = this.props;
    let { file, filename, filetype } = this.state;

    let res = await post_request(`curriculum_file/${course._id}`, {
      file,
      filetype,
      filename,
    });

    if (res.filename) course.curriculum_file = res.filename;
  };

  curriculum_btn = (upload) => {
    let { course } = this.props;
    return (
      <>
        {upload ? (
          <div>
            <>
              <a
                href={`${domain}/Files/${course.curriculum_file}`}
                target="_blank"
                style={{ visibility: "hidden" }}
                className={`curr_${course._id.replace(/~/g, "00")}`}
              ></a>
              <Text_btn
                text={course.curriculum_file}
                action={() =>
                  document
                    .querySelector(`.curr_${course._id.replace(/~/g, "00")}`)
                    .click()
                }
              />
            </>
            <input
              type="file"
              className="form-control mt-2"
              placeholder="Material"
              onChange={this.handle_file}
            />
          </div>
        ) : null}
        <div className="d-flex align-items-center justify-content-center my-5">
          <div
            className="elkios"
            onClick={
              upload ? this.upload_curriculum_file : this.toggle_curriculum_form
            }
          >
            <a href="#" className="add_new_btn">
              <i className="fas fa-plus-circle mr-1"></i>
              {upload ? "Upload" : `Add`} Curriculum
            </a>
          </div>
        </div>
      </>
    );
  };

  render() {
    let { active_tab, course, in_all } = this.props;
    let { curriculum, show_form, slide_in_edit } = this.state;

    return (
      <Logged_admin.Consumer>
        {({ admin_logged }) => {
          this.admin_logged = admin_logged || get_session("logged_admin");

          return (
            <div
              className={`tab-pane fade mt-5 ${
                active_tab === this.tabname || in_all ? " show active" : ""
              }`}
              id="curriculum"
              role="tabpanel"
              aria-labelledby="curriculum-tab"
            >
              <div className="edu_wraper">
                <h4
                  className="edu_title"
                  style={in_all ? { fontSize: 30, marginBottom: 20 } : null}
                >
                  {in_all
                    ? "Discover our Python for Data Science Modules"
                    : "Course curriculum"}
                </h4>

                {this.admin_logged && !show_form
                  ? this.curriculum_btn("Upload")
                  : null}
                {this.admin_logged && !show_form ? this.curriculum_btn() : null}

                {show_form ? (
                  <Curriculum_form
                    course={course._id}
                    slide={slide_in_edit}
                    toggle={this.toggle_curriculum_form}
                  />
                ) : null}

                {curriculum ? (
                  curriculum.length ? (
                    <Accordion defaultActiveKey="0">
                      {curriculum.map((curr, index) =>
                        this.curriculum(curr, index)
                      )}
                    </Accordion>
                  ) : null
                ) : (
                  <Loadindicator contained />
                )}
              </div>
            </div>
          );
        }}
      </Logged_admin.Consumer>
    );
  }
}

export default Course_curriculum;
