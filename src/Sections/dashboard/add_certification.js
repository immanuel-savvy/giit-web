import React from "react";
import { get_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
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
          hide={show_form}
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
              certifications.map((section) => this.section(section))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                {this.add_new_certification_btn()}
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
