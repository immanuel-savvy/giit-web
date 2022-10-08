import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Service from "../service";
import Add_service_form from "./add_service_form";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_form = () =>
    this.setState({
      show_form: !this.state.show_form,
    });

  add_new_service_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add New Service
          </a>
        </div>
      </div>
    );

  componentDidMount = async () => {
    let res = await get_request("services");

    this.setState({ services: Array.isArray(res) ? res : new Array() });

    this.new_service = (service) => {
      let { services } = this.state;
      services = new Array(service, ...services);
      this.setState({ services, service_to_update: null });
    };

    emitter.listen("new_service", this.new_service);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_service", this.new_service);
  };

  remove_service = async (service_id) => {
    let { services } = this.state;
    services = services.filter((service) => service._id !== service_id);

    this.setState({ services });

    await post_request(`remove_service/${service_id}`);
  };

  service = (service) => (
    <Service
      key={service._id}
      service={service}
      remove={() => this.remove_service(service._id)}
    />
  );

  render() {
    let { show_form, services } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage services"
          on_click={this.toggle_form}
          hide={show_form || !services || (services && !services.length)}
          title="add new service"
        />
        <div class="row">
          {show_form ? (
            <div>
              <Add_service_form toggle={this.toggle_form} />
              <hr />
            </div>
          ) : null}

          {services ? (
            services.length && services.map ? (
              services.map((service) => this.service(service))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                {this.add_new_service_btn()}
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

export default Manage_services;
