import React from "react";
import { domain, post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import { emitter } from "../../Giit";

class Add_vendor_form extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { vendor } = this.props;
    vendor &&
      this.setState({
        ...vendor,
        image: `${domain}/Images/${vendor.icon}`,
      });

    this.vendor_to_update = (vendor) => this.setState({ ...vendor });

    emitter.listen("vendor_to_update", this.vendor_to_update);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("vendor_to_update", this.vendor_to_update);
  };

  set_title = ({ target }) => this.setState({ title: target.value });

  set_description = ({ target }) =>
    this.setState({ description: target.value });

  submit = async () => {
    let { title, description, image_hash, _id, courses, image, created } =
      this.state;

    let new_vendor = {
      title,
      image_hash,
      icon: image,
      description,
      courses: 0,
    };

    if (!_id) {
      let response = await post_request("new_vendor", new_vendor);
      new_vendor._id = response._id;
      new_vendor.created = response.created;

      emitter.emit("new_vendor", new_vendor);
    } else {
      new_vendor._id = _id;
      new_vendor.courses = courses;
      new_vendor.created = created;
      if (new_vendor.icon)
        if (new_vendor.icon.startsWith("http"))
          new_vendor.icon = this.props.vendor.icon;

      await post_request("update_vendor", new_vendor);
      emitter.emit("vendor_updated", new_vendor);
    }

    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { image, title, description, _id } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Vendor Form</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={toggle}
              >
                <span aria-hidden="true">
                  <i className="fas fa-times-circle"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form className="forms_block">
                <div className="form-group smalls">
                  <label>Vendor Image (Small Image preferable)</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={this.handle_image}
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                  <div class="d-flex align-items-center justify-content-center">
                    {image ? (
                      <img
                        className="py-3"
                        style={{
                          maxHeight: 200,
                          maxWidth: 200,
                          resize: "both",
                        }}
                        src={this.state.image}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="form-group smalls">
                  <label>Vendor Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_title}
                    value={title}
                  />
                </div>

                <div className="form-group">
                  <label>Vendor Description*</label>
                  <textarea
                    onChange={this.set_description}
                    value={description}
                    className="form-control"
                  ></textarea>
                </div>
                <br />
                <div className="form-group smalls">
                  <button
                    onClick={title && description && this.submit}
                    type="button"
                    className={`btn full-width ${
                      title && description ? "theme-bg" : "grey"
                    } text-white`}
                  >
                    {_id ? "Update Vendor" : "Add Vendor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_vendor_form;
