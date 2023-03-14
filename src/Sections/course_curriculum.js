import React from "react";
import { Accordion } from "react-bootstrap";
import { get_request, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { Logged_admin } from "../Contexts";
import { emitter } from "../Giit";
import Curriculum_form from "./curriculum_form";

class Course_curriculum extends React.Component {
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

    if (in_all)
      curriculum = new Array(
        {
          course: "1",
          created: Date.now(),
          subtopics: new Array(
            {
              text: "Officia aliqua consequat officia enim consequat culpa proident exercitation.",
            },
            {
              text: "Pariatur fugiat eu consectetur occaecat esse dolor adipisicing id.",
            },
            {
              text: "Est fugiat eu eiusmod ullamco dolor dolore id adipisicing aliqua eiusmod.",
            },
            {
              text: "Elit adipisicing eiusmod mollit consequat ut veniam sint sit.",
            },
            {
              text: "Officia aliqua consequat officia enim consequat culpa proident exercitation.",
            }
          ),
          topic:
            "Incididunt ipsum velit ullamco consectetur exercitation in ex anim labore magna.",
        },
        {
          course: "1",
          created: Date.now(),
          subtopics: new Array(
            {
              text: "Officia aliqua consequat officia enim consequat culpa proident exercitation.",
            },
            {
              text: "Pariatur fugiat eu consectetur occaecat esse dolor adipisicing id.",
            },
            {
              text: "Est fugiat eu eiusmod ullamco dolor dolore id adipisicing aliqua eiusmod.",
            },
            {
              text: "Elit adipisicing eiusmod mollit consequat ut veniam sint sit.",
            },
            {
              text: "Officia aliqua consequat officia enim consequat culpa proident exercitation.",
            }
          ),
          topic: "Qui non ex deserunt dolor commodo occaecat veniam.",
        },
        {
          course: "1",
          created: Date.now(),
          subtopics: new Array(
            {
              text: "Officia aliqua consequat officia enim consequat culpa proident exercitation.",
            },
            {
              text: "Pariatur fugiat eu consectetur occaecat esse dolor adipisicing id.",
            },
            {
              text: "Est fugiat eu eiusmod ullamco dolor dolore id adipisicing aliqua eiusmod.",
            },
            {
              text: "Elit adipisicing eiusmod mollit consequat ut veniam sint sit.",
            },
            {
              text: "Officia aliqua consequat officia enim consequat culpa proident exercitation.",
            }
          ),
          topic:
            "Fugiat aliqua Lorem ad occaecat deserunt qui ipsum qui ut ad.",
        },
        {
          course: "1",
          created: Date.now(),
          subtopics: new Array(
            {
              text: "Officia aliqua consequat officia enim consequat culpa proident exercitation.",
            },
            {
              text: "Pariatur fugiat eu consectetur occaecat esse dolor adipisicing id.",
            },
            {
              text: "Est fugiat eu eiusmod ullamco dolor dolore id adipisicing aliqua eiusmod.",
            },
            {
              text: "Elit adipisicing eiusmod mollit consequat ut veniam sint sit.",
            },
            {
              text: "Officia aliqua consequat officia enim consequat culpa proident exercitation.",
            }
          ),
          topic:
            "Enim voluptate commodo laborum exercitation dolore mollit sit sunt mollit occaecat.",
        }
      );
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
          <h6 class="mb-0 accordion_title mt-5">
            <a
              href="#"
              data-toggle="collapse"
              data-target={`#collapse${index}`}
              aria-expanded={current_slide_index === index ? "true" : "false"}
              aria-controls={`collapse${index}`}
              class="d-block position-relative text-dark py-2"
            >
              {`Part ${String(index + 1).padStart(2, "0")}: ${topic}`}

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
          {/* <div
            id={`collapse${index}`}
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
            class={`collapse ${current_slide_index === index ? "show" : ""}`}
          > */}
          <div class="card-body pl-3 pr-3">
            <ul class="lectures_lists">
              {subtopics.map(({ text, book, video }, index) => (
                <li key={index} class={"incomplete" || "complete"}>
                  <div class="lectures_lists_title">
                    <i class="fas fa-check dios"></i>
                  </div>
                  {text}
                  {video ? (
                    <span class="cls_timing">40:20</span>
                  ) : book ? (
                    <></>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          {/* </div> */}
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  toggle_curriculum_form = () =>
    this.setState({ show_form: !this.state.show_form });

  curriculum_btn = () => {
    return (
      <div className="d-flex align-items-center justify-content-center my-5">
        <div class="elkios" onClick={this.toggle_curriculum_form}>
          <a href="#" class="add_new_btn">
            <i class="fas fa-plus-circle mr-1"></i>Add Curriculum
          </a>
        </div>
      </div>
    );
  };

  render() {
    let { active_tab, course, in_all } = this.props;
    let { curriculum, show_form, slide_in_edit } = this.state;

    return (
      <Logged_admin.Consumer>
        {({ admin_logged }) => {
          this.admin_logged = admin_logged;

          return (
            <div
              class={`tab-pane fade mt-5 ${
                active_tab === this.tabname || in_all ? " show active" : ""
              }`}
              id="curriculum"
              role="tabpanel"
              aria-labelledby="curriculum-tab"
            >
              <div class="edu_wraper">
                <h4
                  class="edu_title"
                  style={in_all ? { fontSize: 30, marginBottom: 20 } : null}
                >
                  {in_all
                    ? "Discover our Python for Data Science Modules"
                    : "Course Circullum"}
                </h4>

                {admin_logged && !show_form ? this.curriculum_btn() : null}

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
