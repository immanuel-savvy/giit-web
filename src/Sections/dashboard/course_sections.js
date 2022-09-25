import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { get_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Add_section_form from "./add_section_form";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Course_sections extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  section = ({ title, text, _id, courses }) => {
    return (
      <div key={_id} class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="dash_crs_cat">
          <a href="#" class="remove_tools">
            <i class="fas fa-trash-alt"></i>
          </a>
          <div class="dash_crs_cat_caption">
            <div class="dash_crs_cat_head">
              <h4>{to_title(title)}</h4>
              <span>{`${courses} courses`}</span>
            </div>
            <div class="dash_crs_cat_body">
              <p className="mx-3">{text}</p>
            </div>
            <div class="dash_crs_cat_bottom">
              <a href="#" class="btn full-width theme-bg-light theme-cl">
                Edit Section
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  toggle_section_form = () =>
    this.setState({ show_form: !this.state.show_form });

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
      this.setState({ sections });
    };

    emitter.listen("new_section", this.new_section);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_section", this.new_section);
  };

  render() {
    let { sections, show_form } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage sections"
          right_btn={
            sections && sections.length ? this.add_new_section_btn() : null
          }
        />
        <div class="row">
          {show_form ? (
            <div>
              <Add_section_form toggle={this.toggle_section_form} />
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
