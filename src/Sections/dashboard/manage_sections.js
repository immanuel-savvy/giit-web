import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Add_section_form from "./add_section_form";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Course_sections extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  remove_section = async (section_id) => {
    let { sections } = this.state;
    sections = sections.filter((section) => section._id !== section_id);
    this.setState({ sections });

    await post_request(`remove_section/${section_id}`);
    emitter.emit("section_removed", section_id);
  };

  section = (section) => {
    let { title, text, _id, courses } = section;
    return (
      <div key={_id} class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="dash_crs_cat">
          <a
            onClick={() =>
              window.confirm("Are you sure to remove section? ") &&
              this.remove_section(_id)
            }
            href="#"
            class="remove_tools"
          >
            <i class="fas fa-trash-alt"></i>
          </a>
          <div class="dash_crs_cat_caption">
            <div class="dash_crs_cat_head">
              <h4>{to_title(title)}</h4>
              <span>{`Courses: ${courses.length}`}</span>
            </div>
            <div class="dash_crs_cat_body">
              <p className="mx-3">{text}</p>
            </div>
            <div class="dash_crs_cat_bottom">
              <a
                href="#"
                onClick={() => this.edit_section(section)}
                class="btn full-width theme-bg-light theme-cl"
              >
                Edit Section
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  edit_section = (section) =>
    this.state.show_form
      ? emitter.emit("section_to_update", section)
      : this.setState({ section_to_update: section, show_form: true });

  toggle_section_form = () =>
    this.setState({
      show_form: !this.state.show_form,
      section_to_update: null,
    });

  add_new_section_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_section_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add New Section
          </a>
        </div>
      </div>
    );

  componentDidMount = async () => {
    let res = await get_request("sections");

    this.setState({ sections: Array.isArray(res) ? res : new Array() });

    this.new_section = (section) => {
      let { sections } = this.state;
      sections = new Array(section, ...sections);
      this.setState({ sections, section_to_update: null });
    };

    this.section_updated = (section) => {
      let { sections } = this.state;
      sections = sections.map((section_) => {
        if (section_._id === section._id) return section;
        return section_;
      });
      this.setState({ sections, section_to_update: null });
    };

    emitter.listen("new_section", this.new_section);
    emitter.listen("section_updated", this.section_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("section_updated", this.section_updated);
    emitter.remove_listener("new_section", this.new_section);
  };

  render() {
    let { sections, section_to_update, show_form } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage sections"
          on_click={this.toggle_section_form}
          hide={show_form || !sections || (sections && !sections.length)}
          title="add new section"
        />
        <div class="row">
          {show_form ? (
            <div>
              <Add_section_form
                section={section_to_update}
                toggle={this.toggle_section_form}
              />
              <hr />
            </div>
          ) : null}

          {sections ? (
            sections.length && sections.map ? (
              sections.map((section) => this.section(section))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                {this.add_new_section_btn()}
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

export default Course_sections;
