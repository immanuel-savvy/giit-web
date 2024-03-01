import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import {
  domain,
  get_request,
  post_request,
} from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Add_vendor_form from "./add_vendor_form";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_vendors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let vendors = await get_request("vendors");

    this.setState({ vendors });

    this.new_vendor = (vendor) => {
      let { vendors } = this.state;
      vendors = new Array(...vendors, vendor);
      this.setState({ vendors });
    };

    emitter.listen("new_vendor", this.new_vendor);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_vendor", this.new_vendor);
  };

  remove_vendor = async (vend_id) => {
    let { vendors } = this.state;
    vendors = vendors.filter((vendor) => vendor._id !== vend_id);
    this.setState({ vendors });

    await post_request(`remove_vendor/${vend_id}`);
    emitter.emit("vendor_removed", vend_id);
  };

  edit_vendor = (vendor) =>
    this.state.show_form
      ? emitter.emit("vendor_to_update", vendor)
      : this.setState({
          vendor_to_update: vendor,
          show_form: true,
        });

  toggle_full_text = (_id) =>
    this.setState({ fulltext: this.state.fulltext === _id ? null : _id });

  vendor = (vendor) => {
    let { title, _id, image, courses, description } = vendor;

    return (
      <div key={_id} class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="dash_crs_cat">
          <a
            onClick={() =>
              window.confirm("Are you sure to remove vendor? ") &&
              this.remove_vendor(_id)
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
                onClick={() => this.edit_vendor(vendor)}
                class="btn full-width theme-bg-light theme-cl"
              >
                Edit Vendor
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
          <i class="fas fa-plus-circle mr-1"></i>Add New Vendor
        </a>
      </div>
    </div>
  );

  toggle_certification_form = () =>
    this.setState({ show_form: !this.state.show_form });

  render() {
    let { vendors, vendor_to_update, show_form } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="add vendor"
          title="add new vendor"
          hide={(vendors && !vendors.length) || show_form}
          on_click={this.toggle_certification_form}
        />

        <div className="row">
          {show_form ? (
            <div>
              <Add_vendor_form
                vendor={vendor_to_update}
                toggle={this.toggle_certification_form}
              />
              <hr />
            </div>
          ) : null}

          {vendors ? (
            vendors.length && vendors.map ? (
              vendors.map((vendor) => this.vendor(vendor))
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

export default Manage_vendors;
