import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import Work_benefit from "../../Components/work_benefit";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Add_work_benefit from "./add_work_benefit";
import { emitter } from "../../Giit";

class Manage_work_benefits extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  add_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add Benefit
          </a>
        </div>
      </div>
    );

  toggle_form = () => this.setState({ show_form: !this.state.show_form });

  componentDidMount = async () => {
    let work_benefits = await get_request("work_benefits");

    this.setState({ work_benefits });

    this.work_benefit_added = (benefit) => {
      let { work_benefits } = this.state;

      work_benefits = new Array(benefit, ...work_benefits);
      this.setState({ work_benefits });
    };

    this.work_benefit_removed = (benefit_id) => {
      let { work_benefits } = this.state;

      work_benefits = work_benefits.filter(
        (benefit) => benefit._id !== benefit_id
      );

      this.setState({ work_benefits });
    };

    emitter.listen("work_benefit_added", this.work_benefit_added);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("work_benefit_added", this.work_benefit_added);
  };

  remove_benefit = async (benefit_id) => {
    let { work_benefits } = this.state;

    work_benefits = work_benefits.filter(
      (benefit) => benefit._id !== benefit_id
    );

    this.setState({ work_benefits });

    await post_request(`remove_work_benefit/${benefit_id}`);
  };

  render() {
    let { work_benefits, show_form } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="work benefits"
          on_click={this.toggle_form}
          hide={
            show_form ||
            !work_benefits ||
            (work_benefits && !work_benefits.length)
          }
          title="add benefit"
        />

        <div class="row">
          {show_form ? <Add_work_benefit toggle={this.toggle_form} /> : null}

          {work_benefits ? (
            work_benefits.length ? (
              work_benefits.map((benefit) => (
                <Work_benefit
                  benefit={benefit}
                  remove={() => this.remove_benefit(benefit._id)}
                  key={benefit._id}
                />
              ))
            ) : (
              <div>
                <Listempty />
                <div className="d-flex align-items-center justify-content-center">
                  {this.add_btn()}
                </div>
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

export default Manage_work_benefits;
