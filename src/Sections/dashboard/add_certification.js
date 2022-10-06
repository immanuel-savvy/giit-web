import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import {
  domain,
  get_request,
  post_request,
} from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Add_certification_form from "./add_certification_form";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Add_certification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let certifications = await get_request("certifications");

    this.setState({ certifications });

    this.new_certification = (certification) => {
      let { certifications } = this.state;
      certifications = new Array(...certifications, certification);
      this.setState({ certifications });
    };

    emitter.listen("new_certification", this.new_certification);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_certification", this.new_certification);
  };

  remove_certification = async (cert_id) => {
    let { certifications } = this.state;
    certifications = certifications.filter(
      (certification) => certification._id !== cert_id
    );
    this.setState({ certifications });

    await post_request(`remove_certification/${cert_id}`);
    emitter.emit("certification_removed", cert_id);
  };

  edit_certification = (certification) =>
    this.state.show_form
      ? emitter.emit("certification_to_update", certification)
      : this.setState({
          certification_to_update: certification,
          show_form: true,
        });

  toggle_full_text = (_id) =>
    this.setState({ fulltext: this.state.fulltext === _id ? null : _id });

  certification = (certification) => {
    let { title, _id, image, courses, description } = certification;

    return (
      <div key={_id} class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="dash_crs_cat">
          <a
            onClick={() =>
              window.confirm("Are you sure to remove certification? ") &&
              this.remove_certification(_id)
            }
            href="#"
            class="remove_tools"
          >
            <i class="fas fa-trash-alt"></i>
          </a>
          {image ? (
            <div class="dash_crs_cat_thumb d-flex align-items-center">
              <img
                src={`${domain}/Images/${image}`}
                style={{ maxHeight: 200, width: "100%" }}
                alt=""
                class="img-fluid"
              />
            </div>
          ) : null}
          <div class="dash_crs_cat_caption">
            <div class="dash_crs_cat_head">
              <h4>{to_title(title)}</h4>
              <span>{`Courses: ${(courses && courses.length) || 0}`}</span>
            </div>
            <div
              onClick={() => this.toggle_full_text(_id)}
              class="dash_crs_cat_body"
            >
              <p className="mx-3">
                {this.state.fulltext === _id
                  ? description
                  : `${description.slice(0, 200)}...`}
              </p>
            </div>
            <div class="dash_crs_cat_bottom">
              <a
                href="#"
                onClick={() => this.edit_certification(certification)}
                class="btn full-width theme-bg-light theme-cl"
              >
                Edit Certification
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  add_new_certification_btn = () => (
    <div>
      <div class="elkios" onClick={this.toggle_certification_form}>
        <a
          href="#"
          class="add_new_btn"
          data-toggle="modal"
          data-target="#catModal"
        >
          <i class="fas fa-plus-circle mr-1"></i>Add New Certification
        </a>
      </div>
    </div>
  );

  toggle_certification_form = () =>
    this.setState({ show_form: !this.state.show_form });

  render() {
    let { certifications, certification_to_update, show_form } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="add certification"
          title="add new certification"
          hide={(certifications && !certifications.length) || show_form}
          on_click={this.toggle_certification_form}
        />

        <div className="row">
          {show_form ? (
            <div>
              <Add_certification_form
                certification={certification_to_update}
                toggle={this.toggle_certification_form}
              />
              <hr />
            </div>
          ) : null}

          {certifications ? (
            certifications.length && certifications.map ? (
              certifications.map((certification) =>
                this.certification(certification)
              )
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                {show_form ? null : this.add_new_certification_btn()}
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

export default Add_certification;
